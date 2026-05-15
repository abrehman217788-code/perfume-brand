const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3080;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const PORT = process.env.PORT || HTTP_PORT;

const sslPath = path.join(__dirname, 'ssl');
let sslOptions = null;
if (fs.existsSync(path.join(sslPath, 'server.key')) && fs.existsSync(path.join(sslPath, 'server.crt'))) {
    sslOptions = {
        key: fs.readFileSync(path.join(sslPath, 'server.key')),
        cert: fs.readFileSync(path.join(sslPath, 'server.crt'))
    };
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
            connectSrc: ["'self'"],
            formAction: ["'self'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { error: 'Too many contact submissions. Try again in an hour.' }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'technova-secret-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '0');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
});

app.use((req, res, next) => {
    if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') return next();
    if (!req.secure) {
        return res.redirect(301, `https://${req.hostname}:${HTTPS_PORT}${req.originalUrl}`);
    }
    next();
});

const getData = (filename) => {
    const filePath = path.join(__dirname, 'data', filename);
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const projectsRoot = path.resolve(__dirname, '..');

app.use('/projects', express.static(projectsRoot));

const getProjectDirs = () => {
    if (!fs.existsSync(projectsRoot)) return [];
    return fs.readdirSync(projectsRoot, { withFileTypes: true })
        .filter(e => e.isDirectory() && !['tech-company-website','portfolio','.git','node_modules','cv buider','lumina-cafe','clothing-brand-website','cafe-website','ai-code-reviewer','portfolio-website','cv builder','cv-studio'].includes(e.name) && !e.name.startsWith('.'))
        .map(dir => ({
            name: dir.name,
            link: fs.existsSync(path.join(projectsRoot, dir.name, 'index.html'))
                ? `/projects/${dir.name}/index.html` : `/projects/${dir.name}/`,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
        }));
};

app.get('/', (req, res) => {
    const services = getData('services.json');
    const projects = getData('portfolio.json').filter(p => p.featured);
    const testimonials = getData('testimonials.json');
    const team = getData('team.json');
    const clients = getData('clients.json');
    const blog = getData('blog.json');
    const pricing = getData('pricing.json');
    const faq = getData('faq.json');
    const milestones = getData('milestones.json');
    const projectDirs = getProjectDirs();
    res.render('index', {
        title: 'TechNova Solutions | Enterprise Innovation',
        services, projects, testimonials, team, clients, blog, pricing, faq, milestones, projectDirs
    });
});

app.get('/services', (req, res) => {
    const services = getData('services.json');
    res.render('services', { title: 'Services | TechNova Solutions', services });
});

app.get('/portfolio', (req, res) => {
    const projects = getData('portfolio.json');
    res.render('portfolio', { title: 'Portfolio | TechNova Solutions', projects });
});

app.get('/about', (req, res) => {
    const team = getData('team.json');
    const milestones = getData('milestones.json');
    res.render('about', { title: 'About | TechNova Solutions', team, milestones, success: null });
});

app.get('/careers', (req, res) => {
    const careers = getData('careers.json');
    res.render('careers', { title: 'Careers | TechNova Solutions', careers });
});

app.get('/privacy', (req, res) => {
    res.render('privacy', { title: 'Privacy Policy | TechNova Solutions' });
});

app.get('/terms', (req, res) => {
    res.render('terms', { title: 'Terms of Service | TechNova Solutions' });
});

app.post('/contact', contactLimiter, (req, res) => {
    const sanitize = (str) => String(str || '').replace(/[<>"'/]/g, '').trim().slice(0, 1000);
    const name = sanitize(req.body.name).slice(0, 100);
    const email = String(req.body.email || '').trim().slice(0, 254);
    const message = sanitize(req.body.message).slice(0, 2000);
    const subject = sanitize(req.body.subject).slice(0, 200) || 'General Inquiry';
    if (!name || !email || !message) {
        const team = getData('team.json');
        const milestones = getData('milestones.json');
        return res.render('about', { title: 'About | TechNova Solutions', team, milestones, success: null, error: 'All fields are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const team = getData('team.json');
        const milestones = getData('milestones.json');
        return res.render('about', { title: 'About | TechNova Solutions', team, milestones, success: null, error: 'Invalid email address.' });
    }
    console.log(`\n=== NEW CONTACT ===`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`===================\n`);
    const team = getData('team.json');
    const milestones = getData('milestones.json');
    res.render('about', {
        title: 'About | TechNova Solutions',
        team, milestones,
        success: 'Thank you for reaching out! Our team will contact you within 24 hours.'
    });
});

app.post('/api/newsletter', (req, res) => {
    const email = String(req.body.email || '').trim().slice(0, 254);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }
    console.log(`Newsletter subscription: ${email}`);
    res.json({ success: true, message: 'Subscribed successfully!' });
});

app.get('/api/stats', (req, res) => {
    res.json({ projects: 350, clients: 180, team: 85, uptime: 99.9 });
});

app.use((req, res) => {
    res.status(404).render('about', {
        title: '404 | TechNova Solutions',
        team: getData('team.json'),
        milestones: getData('milestones.json'),
        success: null
    });
});



if (process.env.PORT) {
    app.listen(PORT, () => {
        console.log(`TechNova server running on port ${PORT}`);
    });
} else {
    if (sslOptions) {
        https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
            console.log(`TechNova secured server running at https://localhost:${HTTPS_PORT}`);
        });
    }
    app.listen(PORT, () => {
        console.log(`TechNova server running on http://localhost:${PORT}`);
    });
}
