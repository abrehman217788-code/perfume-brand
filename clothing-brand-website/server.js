const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');

const app = express();
const HTTP_PORT = 4080;
const HTTPS_PORT = 4443;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));
app.use(session({
  secret: 'street-archive-redesign-2026',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 }
}));

const getData = (fn) => {
  const fp = path.join(__dirname, 'data', fn);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
};

const POR = (sku) => {
  const skuPrices = { 'SA-CG-001': 189, 'SA-HD-002': 145, 'SA-TE-003': 65, 'SA-AC-004': 220, 'SA-JK-005': 320, 'SA-CG-006': 110 };
  return skuPrices[sku] || 0;
};

app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  res.locals.cart = req.session.cart;
  res.locals.cartTotal = req.session.cart.reduce((t, i) => t + (POR(i.sku) * (i.qty || 1)), 0);
  res.locals.cartCount = req.session.cart.reduce((t, i) => t + (i.qty || 1), 0);
  res.locals.currentPage = req.path.replace('/', '') || 'home';
  res.locals.user = req.session.user || null;
  res.locals.success = null;
  res.locals.error = null;
  next();
});

app.get('/', (req, res) => {
  const products = getData('products.json');
  const lookbooks = getData('lookbooks.json');
  const testimonials = getData('testimonials.json');
  const blog = getData('blog.json');
  const faq = getData('faq.json');
  const community = getData('community.json');
  res.render('index', { title: 'STREET_ARCHIVE | Brutalist Streetwear', products, lookbooks, testimonials, blog, faq, community });
});

app.get('/shop', (req, res) => {
  const products = getData('products.json');
  const categories = [...new Set(products.map(p => p.category))];
  res.render('shop', { title: 'Shop | STREET_ARCHIVE', products, categories });
});

app.get('/product/:id', (req, res) => {
  const products = getData('products.json');
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).render('shop', { title: '404 | STREET_ARCHIVE', products, categories: [] });
  const related = products.filter(p => p.id !== product.id).slice(0, 4);
  res.render('product', { title: product.name + ' | STREET_ARCHIVE', product, related });
});

app.get('/cart', (req, res) => {
  const products = getData('products.json');
  const cartItems = req.session.cart.map(item => {
    const prod = products.find(p => p.sku === item.sku);
    return { ...item, product: prod || null };
  });
  res.render('cart', { title: 'Cart | STREET_ARCHIVE', cartItems });
});

app.post('/cart/add', (req, res) => {
  const { sku, qty } = req.body;
  if (!sku) return res.redirect('/shop');
  const existing = req.session.cart.find(i => i.sku === sku);
  if (existing) existing.qty = (existing.qty || 1) + (parseInt(qty) || 1);
  else req.session.cart.push({ sku, qty: parseInt(qty) || 1 });
  res.redirect('/cart');
});

app.post('/cart/update', (req, res) => {
  const { sku, qty } = req.body;
  const item = req.session.cart.find(i => i.sku === sku);
  if (item) item.qty = Math.max(1, parseInt(qty) || 1);
  res.redirect('/cart');
});

app.post('/cart/remove', (req, res) => {
  const { sku } = req.body;
  req.session.cart = req.session.cart.filter(i => i.sku !== sku);
  res.redirect('/cart');
});

app.get('/checkout', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) return res.redirect('/cart');
  res.render('checkout', { title: 'Checkout | STREET_ARCHIVE' });
});

app.post('/checkout/process', (req, res) => {
  const { email, name, address, city, state, zip, payment } = req.body;
  if (!email || !name) {
    return res.render('checkout', { title: 'Checkout | STREET_ARCHIVE', error: 'Please fill in all required fields.' });
  }
  const orderNum = 'SA-' + String(Math.floor(Math.random() * 90000) + 10000);
  const orders = getData('orders.json');
  orders.push({
    id: 'o-' + Date.now(),
    orderNumber: orderNum,
    customerName: name,
    email,
    items: req.session.cart.map(i => ({ sku: i.sku, quantity: i.qty, price: POR(i.sku) })),
    total: req.session.cart.reduce((t, i) => t + (POR(i.sku) * (i.qty || 1)), 0),
    status: 'confirmed',
    payment: payment || 'card',
    estimatedDelivery: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    timeline: [
      { date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), event: 'Order Placed', completed: true },
      { date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), event: 'Payment Confirmed', completed: true },
      { date: new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), event: 'Order Shipped', completed: false },
      { date: new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), event: 'Estimated Delivery', completed: false }
    ],
    shippingAddress: { street: address, city, state, zip },
    createdAt: new Date().toISOString()
  });
  fs.writeFileSync(path.join(__dirname, 'data', 'orders.json'), JSON.stringify(orders, null, 2));
  req.session.cart = [];
  res.redirect('/order/' + orderNum);
});

app.get('/order/:orderNumber', (req, res) => {
  const orders = getData('orders.json');
  const order = orders.find(o => o.orderNumber === req.params.orderNumber);
  if (!order) return res.redirect('/');
  res.render('order-tracking', { title: 'Order ' + order.orderNumber + ' | STREET_ARCHIVE', order });
});

app.get('/style-quiz', (req, res) => {
  const quiz = getData('style-quiz.json');
  const products = getData('products.json');
  res.render('style-quiz', { title: 'Style Quiz | STREET_ARCHIVE', quiz, products });
});

app.post('/style-quiz/results', (req, res) => {
  const { style, fit, palette } = req.body;
  const products = getData('products.json');
  const tags = [style, fit, palette].filter(Boolean);
  const results = products.filter(p => {
    const pTags = [p.category?.toLowerCase(), ...p.colors.map(c => c.toLowerCase()), p.fabric?.toLowerCase()];
    return tags.some(t => pTags.some(pt => pt.includes(t)));
  });
  res.render('style-quiz-results', { title: 'Your Results | STREET_ARCHIVE', products: results.length > 0 ? results : products });
});

app.get('/lookbooks', (req, res) => {
  const lookbooks = getData('lookbooks.json');
  res.render('lookbooks', { title: 'Lookbooks | STREET_ARCHIVE', lookbooks });
});

app.get('/returns', (req, res) => {
  res.render('returns', { title: 'Returns | STREET_ARCHIVE' });
});

app.post('/returns/request', (req, res) => {
  const { orderNumber, email, reason } = req.body;
  res.render('returns', { title: 'Returns | STREET_ARCHIVE', success: 'Return request submitted. We will email you a QR code within 24 hours.' });
});

app.get('/tracking', (req, res) => {
  const orders = getData('orders.json');
  res.render('tracking', { title: 'Order Tracking | STREET_ARCHIVE', orders });
});

app.post('/tracking/lookup', (req, res) => {
  const { orderNumber, email } = req.body;
  const orders = getData('orders.json');
  const order = orders.find(o => o.orderNumber === orderNumber && o.email === email);
  if (!order) {
    const allOrders = getData('orders.json');
    return res.render('tracking', { title: 'Order Tracking | STREET_ARCHIVE', orders: allOrders, error: 'Order not found. Please check your details.' });
  }
  res.redirect('/order/' + order.orderNumber);
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About | STREET_ARCHIVE' });
});

app.get('/sustainability', (req, res) => {
  res.render('sustainability', { title: 'Sustainability | STREET_ARCHIVE' });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact:', name, email, message?.substring(0, 100));
  res.render('about', { title: 'About | STREET_ARCHIVE', success: 'Message received. We respond within 24 hours.' });
});

app.post('/api/community/upload', (req, res) => {
  res.json({ success: true, message: 'Photo submitted for review. It will appear on the community wall once approved.' });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false });
  console.log('Newsletter:', email);
  res.json({ success: true });
});

app.use((req, res) => {
  const products = getData('products.json');
  res.status(404).render('shop', { title: '404 | STREET_ARCHIVE', products, categories: [] });
});

const sslPath = path.join(__dirname, 'ssl');
const hasSSL = fs.existsSync(path.join(sslPath, 'server.key')) && fs.existsSync(path.join(sslPath, 'server.crt'));
if (hasSSL) {
  https.createServer({
    key: fs.readFileSync(path.join(sslPath, 'server.key')),
    cert: fs.readFileSync(path.join(sslPath, 'server.crt'))
  }, app).listen(HTTPS_PORT, () => console.log(`SA secured: https://localhost:${HTTPS_PORT}`));
}
app.listen(HTTP_PORT, () => console.log(`SA: http://localhost:${HTTP_PORT} → https://localhost:${HTTPS_PORT}`));