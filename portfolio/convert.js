const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true
    });
    const page = await browser.newPage();
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    console.log('Loading:', filePath);
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Add a small delay for any animations to settle
    await new Promise(r => setTimeout(r, 1000));
    
    await page.pdf({
      path: 'portfolio.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();
    console.log('PDF generated successfully: portfolio.pdf');
  } catch (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  }
})();
