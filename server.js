const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

function prefixMiddleware(prefix) {
  return (req, res, next) => {
    const originalRender = res.render.bind(res);
    res.render = function (view, options, callback) {
      originalRender(view, options, function (err, html) {
        if (err) {
          if (callback) return callback(err);
          return res.send(err);
        }
        if (html && typeof html === 'string') {
          html = html.replace(/(href|src|action)="\/(?!\/)/g, `$1="/${prefix}/`);
        }
        if (callback) {
          callback(null, html);
        } else {
          res.send(html);
        }
      });
    };
    next();
  };
}

function main() {
  const app = express();

  // Root - redirect to functional e-commerce portfolio
  app.get('/', (req, res) => {
    res.redirect('/ecommerce');
  });

  // Cafe
  const cafeApp = require('./cafe-website/server');
  app.use('/cafe', prefixMiddleware('cafe'), cafeApp);

  // Clothing brand
  const clothingApp = require('./clothing-brand-website/server');
  app.use('/clothing', prefixMiddleware('clothing'), clothingApp);

  // CV Studio
  const cvStudioApp = require('./cv builder/cv-studio/server');
  app.use('/cv-studio', prefixMiddleware('cv-studio'), cvStudioApp);

  // Lumina Cafe
  const luminaApp = require('./lumina-cafe/server');
  app.use('/lumina', prefixMiddleware('lumina'), luminaApp);

  // Tech Company
  const techApp = require('./tech-company-website/server');
  app.use('/tech', prefixMiddleware('tech'), techApp);

  // E-commerce (static)
  app.use('/ecommerce', express.static(path.join(__dirname, 'ecommerce-website')));

  // Perfume Brand (static fallback - Next.js requires separate deployment)
  const perfumeDir = path.join(__dirname, 'perfume-brand');
  app.use('/perfume', express.static(path.join(perfumeDir, 'public')));
  app.use('/perfume', express.static(perfumeDir));

  app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
    console.log(`  /      - ShopVerse Portfolio`);
    console.log(`  /cafe  - Cafe Serenity`);
    console.log(`  /clothing - Street Archive`);
    console.log(`  /cv-studio - CV Studio`);
    console.log(`  /lumina - Lumina Cafe`);
    console.log(`  /tech  - TechNova Solutions`);
    console.log(`  /ecommerce - E-commerce site`);
    console.log(`  /perfume - Auree Perfume`);
  });
}

main();
