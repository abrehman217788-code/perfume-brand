const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Capture Street Archive
    console.log('Capturing Street Archive...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 10000 });
        await page.screenshot({ path: 'images/street-archive-real.png' });
        console.log('Street Archive captured.');
    } catch (e) {
        console.error('Failed to capture Street Archive:', e.message);
    }

    // Capture CV Studio
    console.log('Capturing CV Studio...');
    try {
        await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 10000 });
        await page.screenshot({ path: 'images/cv-studio-real.png' });
        console.log('CV Studio captured.');
    } catch (e) {
        console.error('Failed to capture CV Studio:', e.message);
    }

    await browser.close();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
