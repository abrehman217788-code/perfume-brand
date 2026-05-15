const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Build perfume-brand Next.js app
const perfumeDir = path.join(__dirname, '..', 'perfume-brand');
const pkgPath = path.join(perfumeDir, 'package.json');
if (fs.existsSync(pkgPath)) {
  console.log('Building perfume-brand (Next.js)...');
  try {
    execSync('npm run build', { cwd: perfumeDir, stdio: 'inherit' });
    console.log('perfume-brand build complete');
  } catch (e) {
    console.error('perfume-brand build failed (non-fatal):', e.message);
  }
}
