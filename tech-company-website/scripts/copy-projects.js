const fs = require('fs');
const path = require('path');

const sourceRoot = path.resolve(__dirname, '..', '..', 'html'); // ../../html
const destRoot = path.resolve(__dirname, '..', 'public', 'projects');

if (!fs.existsSync(destRoot)) {
  fs.mkdirSync(destRoot, { recursive: true });
}

const exclude = new Set(['portfolio', 'tech-company-website']);

fs.readdirSync(sourceRoot, { withFileTypes: true }).forEach(entry => {
  if (entry.isDirectory() && !exclude.has(entry.name)) {
    const src = path.join(sourceRoot, entry.name);
    const dest = path.join(destRoot, entry.name);
    // Remove existing dest if present
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    // Copy directory recursively
    copyRecursive(src, dest);
  }
});

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Projects copied to public/projects');
