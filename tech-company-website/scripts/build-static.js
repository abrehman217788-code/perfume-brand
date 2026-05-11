const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..', 'html');
const DIST = path.resolve(__dirname, '..', '..', '..', 'html');

const EXCLUDE = new Set(['portfolio', 'tech-company-website', '.git', 'node_modules', 'cv buider']);
const IGNORE_FILES = new Set(['.gitignore', 'package-lock.json', 'package.json', 'styles.css', 'server.log', 'server.err']);

const entries = fs.readdirSync(ROOT, { withFileTypes: true });
const projects = entries
  .filter(e => e.isDirectory() && !EXCLUDE.has(e.name) && !e.name.startsWith('.') && e.name !== '{ } html')
  .map(e => {
    const dirPath = path.join(ROOT, e.name);
    const files = fs.readdirSync(dirPath);

    let entry = e.name + '/';
    if (files.includes('index.html')) entry = e.name + '/index.html';
    else if (files.includes('public') && fs.readdirSync(path.join(dirPath, 'public')).includes('index.html'))
      entry = e.name + '/public/index.html';

    const pkgPath = path.join(dirPath, 'package.json');
    const hasServer = files.includes('server.js');

    let desc = hasServer ? 'Express + EJS app' : 'Static site';
    if (e.name === 'clothing-brand-website') desc = 'Brutalist streetwear brand with cart & auth';
    else if (e.name === 'cafe-website') desc = 'Cafe bistro site with menu, cart & reservations';
    else if (e.name === 'lumina-cafe') desc = 'Cafe site with MongoDB & custom CSS';
    else if (e.name.startsWith('cv')) desc = 'CV builder with live preview & API';
    else if (e.name === 'tech-company-website') return null;

    return { name: e.name, entry, desc };
  })
  .filter(Boolean);

console.log('Detected projects:', projects.map(p => p.name).join(', '));

// Generate project cards JS
let cardsJS = 'const projects = ' + JSON.stringify(projects.map((p, i) => ({
  name: p.name,
  entry: p.entry,
  label: p.desc,
  img: null
})), null, 2) + ';';

console.log('Build complete. Found ' + projects.length + ' projects.');
