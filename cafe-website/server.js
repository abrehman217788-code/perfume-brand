const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'lumina_sanctuary_secret',
  resave: false,
  saveUninitialized: false
}));

const getMenu = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'menu.json'), 'utf8');
  return JSON.parse(data);
};

app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  res.locals.cart = req.session.cart;
  res.locals.cartTotal = req.session.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.locals.cartCount = req.session.cart.reduce((sum, item) => sum + item.qty, 0);
  next();
});

app.get('/', (req, res) => {
  const menu = getMenu();
  const featured = menu.filter(item => ['golden-hour-latte', 'rosemary-bloom', 'minty-matcha', 'matcha-tiramisu'].includes(item.id));
  res.render('index', { menu: featured });
});

app.get('/menu', (req, res) => {
  const menu = getMenu();
  const category = req.query.category || 'all';
  const filtered = category === 'all' ? menu : menu.filter(item => item.category === category);
  res.render('menu', { menu: filtered, activeCategory: category, allCategories: ['all', 'coffee', 'specialty', 'food'] });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/reservations', (req, res) => {
  res.render('reservations');
});

app.post('/reservations', (req, res) => {
  const { name, date, time, guests } = req.body;
  res.render('reservations', { 
    success: `We've reserved a spot for ${guests} on ${date} at ${time}. We can't wait to see you, ${name}!` 
  });
});

app.post('/cart/add', (req, res) => {
  const { id } = req.body;
  const menu = getMenu();
  const item = menu.find(i => i.id === id);
  if (item) {
    const existing = req.session.cart.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      req.session.cart.push({ ...item, qty: 1 });
    }
  }
  res.redirect('/menu');
});

app.post('/cart/update', (req, res) => {
  const { id, qty } = req.body;
  const numQty = parseInt(qty);
  if (numQty <= 0) {
    req.session.cart = req.session.cart.filter(i => i.id !== id);
  } else {
    const item = req.session.cart.find(i => i.id === id);
    if (item) item.qty = numQty;
  }
  res.redirect('/cart');
});

app.post('/cart/remove', (req, res) => {
  req.session.cart = req.session.cart.filter(i => i.id !== req.body.id);
  res.redirect('/cart');
});

app.get('/cart', (req, res) => {
  res.render('cart');
});

app.post('/checkout', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) return res.redirect('/cart');
  req.session.cart = [];
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.listen(PORT, () => {
  console.log(`Lumina Cafe running on http://localhost:${PORT}`);
});
