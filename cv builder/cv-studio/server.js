const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'cvs.json');

// ── Security Middleware ──
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'");
  
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    return next();
  }
  if (process.env.NODE_ENV === 'production' && req.method === 'GET' && !req.path.startsWith('/api')) {
    const httpsUrl = `https://${req.headers.host}${req.url}`;
    if (req.headers.host && !req.headers.host.includes('localhost')) {
      return res.redirect(301, httpsUrl);
    }
  }
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ── Rate Limiting ──
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 100; // max requests per window

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return next();
  }

  const data = rateLimitStore.get(ip);
  if (now - data.start > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return next();
  }

  data.count++;
  if (data.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  next();
}

app.use('/api', rateLimit);

// ── Request Logging ──
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// ── Serve Static Files ──
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// ── Data Storage ──
const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Atomic write
    const tmpFile = DATA_FILE + '.tmp';
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2));
    fs.renameSync(tmpFile, DATA_FILE);
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

// ── Sanitize CV Data ──
function sanitizeCv(cv) {
  const sanitized = {};
  const allowedFields = ['id', 'name', 'title', 'email', 'phone', 'location', 'linkedin', 'github', 'website', 'summary', 'experience', 'education', 'skills', 'languages', 'projects', 'certifications', 'template', 'color', 'font', 'layout', 'language', 'sectionOrder', 'versions', 'views', 'lastViewed', 'shareId', 'createdAt', 'updatedAt'];
  
  allowedFields.forEach(field => {
    if (cv[field] !== undefined) {
      sanitized[field] = cv[field];
    }
  });

  // Ensure required fields
  if (!sanitized.id && cv.id) sanitized.id = cv.id;
  if (!sanitized.createdAt) sanitized.createdAt = new Date().toISOString();
  sanitized.updatedAt = new Date().toISOString();

  // Validate arrays
  if (!Array.isArray(sanitized.experience)) sanitized.experience = [];
  if (!Array.isArray(sanitized.education)) sanitized.education = [];
  if (!Array.isArray(sanitized.skills)) sanitized.skills = [];
  if (!Array.isArray(sanitized.languages)) sanitized.languages = [];
  if (!Array.isArray(sanitized.versions)) sanitized.versions = [];

  // Sanitize strings to prevent XSS
  ['name', 'title', 'email', 'phone', 'location', 'summary'].forEach(field => {
    if (sanitized[field] && typeof sanitized[field] === 'string') {
      sanitized[field] = sanitized[field].replace(/<[^>]*>/g, '');
    }
  });

  return sanitized;
}

// ── API Endpoints ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// List all CVs (with pagination)
app.get('/api/cvs', (req, res) => {
  try {
    const cvs = readData();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    const paginated = cvs.slice(start, end);
    const sanitized = paginated.map(cv => ({
      id: cv.id,
      name: cv.name || 'Untitled CV',
      title: cv.title || '',
      template: cv.template || 'modern',
      color: cv.color || '#6C5CE7',
      language: cv.language || 'en',
      shareId: cv.shareId || null,
      views: cv.views || 0,
      updatedAt: cv.updatedAt || cv.createdAt || cv.id,
      createdAt: cv.createdAt
    }));
    
    res.json(sanitized);
  } catch (error) {
    console.error('Error listing CVs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Lookup CV by shareId
app.get('/api/share/:shareId', (req, res) => {
  try {
    const cvs = readData();
    const cv = cvs.find(c => c.shareId === req.params.shareId);
    if (!cv) {
      return res.status(404).json({ error: 'Shared CV not found' });
    }
    cv.views = (cv.views || 0) + 1;
    cv.lastViewed = new Date().toISOString();
    writeData(cvs);
    res.json(cv);
  } catch (error) {
    console.error('Error fetching shared CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single CV
app.get('/api/cvs/:id', (req, res) => {
  try {
    const cvs = readData();
    const cv = cvs.find(c => c.id === req.params.id);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }
    
    // Increment view count
    if (req.query.track === 'true') {
      cv.views = (cv.views || 0) + 1;
      cv.lastViewed = new Date().toISOString();
      writeData(cvs);
    }
    
    res.json(cv);
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create / Update CV
app.post('/api/cvs', (req, res) => {
  try {
    const cvs = readData();
    const cv = sanitizeCv(req.body);
    
    if (!cv.id) {
      cv.id = 'cv_' + Date.now().toString(36) + '_' + crypto.randomBytes(4).toString('hex');
    }
    
    const index = cvs.findIndex(c => c.id === cv.id);
    if (index > -1) {
      cvs[index] = cv;
    } else {
      cvs.push(cv);
    }
    
    if (writeData(cvs)) {
      res.status(201).json(cv);
    } else {
      res.status(500).json({ error: 'Failed to save data' });
    }
  } catch (error) {
    console.error('Error saving CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete CV
app.delete('/api/cvs/:id', (req, res) => {
  try {
    let cvs = readData();
    const index = cvs.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'CV not found' });
    }
    
    cvs.splice(index, 1);
    if (writeData(cvs)) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Failed to delete CV' });
    }
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Duplicate CV
app.post('/api/cvs/:id/duplicate', (req, res) => {
  try {
    const cvs = readData();
    const original = cvs.find(c => c.id === req.params.id);
    if (!original) {
      return res.status(404).json({ error: 'CV not found' });
    }
    
    const duplicate = JSON.parse(JSON.stringify(original));
    duplicate.id = 'cv_' + Date.now().toString(36) + '_' + crypto.randomBytes(4).toString('hex');
    duplicate.name = (duplicate.name || 'CV') + ' (Copy)';
    duplicate.shareId = null;
    duplicate.views = 0;
    duplicate.createdAt = new Date().toISOString();
    duplicate.updatedAt = duplicate.createdAt;
    
    cvs.push(duplicate);
    writeData(cvs);
    res.status(201).json(duplicate);
  } catch (error) {
    console.error('Error duplicating CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics endpoint
app.get('/api/stats', (req, res) => {
  try {
    const cvs = readData();
    const stats = {
      total: cvs.length,
      completed: cvs.filter(c => c.experience && c.experience.length > 0).length,
      drafts: cvs.filter(c => !c.name || !c.experience || c.experience.length === 0).length,
      shared: cvs.filter(c => c.shareId).length,
      totalViews: cvs.reduce((sum, c) => sum + (c.views || 0), 0),
      languages: {}
    };
    
    cvs.forEach(c => {
      const lang = c.language || 'en';
      stats.languages[lang] = (stats.languages[lang] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── HTTPS Support ──
function startSecureServer() {
  const certPath = process.env.SSL_CERT_PATH || path.join(__dirname, 'ssl');
  const keyFile = path.join(certPath, 'key.pem');
  const certFile = path.join(certPath, 'cert.pem');

  if (fs.existsSync(keyFile) && fs.existsSync(certFile)) {
    const httpsOptions = {
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile)
    };
    https.createServer(httpsOptions, app).listen(443, () => {
      console.log('HTTPS Server running on port 443');
    });
  }
}

// ── Start Server ──
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CV Studio Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Auto-generate SSL cert for production
    if (process.env.NODE_ENV === 'production') {
      startSecureServer();
    }
  });
}

if (require.main === module) {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
  });
}

module.exports = app;
