const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'elegant-tech-secret-2026',
    resave: false,
    saveUninitialized: true
}));

// Helper to read data
const getData = (filename) => {
    const filePath = path.join(__dirname, 'data', filename);
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Helper to read project folders from the parent html directory
const getProjectsFromDir = () => {
    const projectsRoot = path.resolve(__dirname, '..', '..', 'html'); // one level up from tech-company-website
    const entries = fs.readdirSync(projectsRoot, { withFileTypes: true });
    const projects = entries
        .filter(e => e.isDirectory() && e.name.toLowerCase() !== 'portfolio' && e.name !== 'tech-company-website')
        .map(dir => {
            const projPath = path.join(projectsRoot, dir.name);
            const indexPath = path.join(projPath, 'index.html');
            const thumbPath = fs.existsSync(path.join(projPath, 'thumbnail.png')) ? `/projects/${dir.name}/thumbnail.png` : '/images/default-project.png';
            return {
                name: dir.name,
                link: `/projects/${dir.name}/index.html`,
                image: thumbPath
            };
        });
    return projects;
};

// Serve the raw HTML project folders under /projects
app.use('/projects', express.static(path.resolve(__dirname, '..', '..', 'html')));

// Routes
app.get('/', (req, res) => {
    const services = getData('services.json').slice(0, 3);
    const projects = getProjectsFromDir(); // dynamic list of HTML projects
    res.render('index', { title: 'Digital Elegance | IT Solutions', services, projects });
});

app.get('/services', (req, res) => {
    const services = getData('services.json');
    res.render('services', { title: 'Our Services | Elegant Tech', services });
});

app.get('/portfolio', (req, res) => {
    const projects = getData('portfolio.json');
    res.render('portfolio', { title: 'Portfolio | Elegant Tech', projects });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us | Elegant Tech' });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact Form Submission: ${name} (${email}) - ${message}`);
    res.render('about', { 
        title: 'About Us | Elegant Tech', 
        success: 'Thank you for reaching out! Our team will contact you shortly.' 
    });
});

app.listen(PORT, () => {
    console.log(`Elegant Tech Showcase server running at http://localhost:${PORT}`);
});
