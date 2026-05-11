const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
  secret: 'street_archive_secret',
  resave: false,
  saveUninitialized: false
}));

// MongoDB Connection
let isOfflineMode = false;
mongoose.connect('mongodb://localhost:27017/street_archive')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection failed, running in offline mode.');
    isOfflineMode = true;
  });

// Helper to get products (from DB or JSON)
const getProducts = async () => {
  if (!isOfflineMode) {
    try {
      const dbProducts = await Product.find({});
      if (dbProducts.length > 0) return dbProducts;
    } catch (e) {
      console.error('Error fetching from DB:', e);
    }
  }
  // Fallback to JSON
  const data = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8');
  return JSON.parse(data);
};

const getProductById = async (id) => {
  if (!isOfflineMode) {
    try {
      const product = await Product.findById(id);
      if (product) return product;
    } catch (e) {
      // Might be a non-objectId string if using local IDs
    }
  }
  const products = await getProducts();
  return products.find(p => p.id === id || p._id?.toString() === id);
};

// Cart middleware
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.locals.cart = req.session.cart;
  res.locals.cartTotal = req.session.cart.reduce((total, item) => total + item.price, 0);
  next();
});

// Routes
app.get('/', async (req, res) => {
  const products = await getProducts();
  res.render('index', { user: req.session.user, products });
});

app.get('/about', (req, res) => {
  res.render('about', { user: req.session.user });
});

app.get('/shop', async (req, res) => {
  const products = await getProducts();
  res.render('shop', { user: req.session.user, products });
});

app.get('/product/:id', async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.render('product', { user: req.session.user, product });
});

// For backward compatibility with the old link in index.ejs
app.get('/product', async (req, res) => {
  const products = await getProducts();
  res.render('product', { user: req.session.user, product: products[0] });
});

// Cart Routes
app.post('/cart/add', async (req, res) => {
  const productId = req.body.productId;
  const product = await getProductById(productId);
  if (product) {
    req.session.cart.push(product);
  }
  res.redirect('/cart');
});

app.post('/cart/remove', (req, res) => {
  const index = req.body.index;
  if (index >= 0 && index < req.session.cart.length) {
    req.session.cart.splice(index, 1);
  }
  res.redirect('/cart');
});

app.get('/cart', (req, res) => {
  res.render('cart', { user: req.session.user });
});

// Checkout Routes
app.post('/checkout', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/cart');
  }
  // Clear cart
  req.session.cart = [];
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.render('success', { user: req.session.user });
});

// User routes
app.get('/login', (req, res) => {
  res.render('login', { user: req.session.user });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@streetarchive.com' && password === 'admin') {
    req.session.user = { email, role: 'admin' };
    res.redirect('/');
  } else {
    res.render('login', { error: 'Invalid credentials', user: req.session.user });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});