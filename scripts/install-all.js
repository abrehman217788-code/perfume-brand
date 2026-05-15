const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const dirs = [
  'cafe-website',
  'clothing-brand-website',
  'cv builder/cv-studio',
  'lumina-cafe',
  'perfume-brand',
  'tech-company-website',
];

for (const dir of dirs) {
  const fullPath = path.join(__dirname, '..', dir);
  const pkgPath = path.join(fullPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    console.log(`Installing dependencies in ${dir}...`);
    try {
      execSync('npm install --omit=dev 2>&1 || npm install', { cwd: fullPath, stdio: 'inherit' });
    } catch (e) {
      console.error(`Failed to install in ${dir}: ${e.message}`);
    }
  } else {
    console.log(`Skipping ${dir} (no package.json)`);
  }
}
