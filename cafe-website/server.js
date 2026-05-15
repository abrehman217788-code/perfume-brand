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
  secret: 'cafe_serenity_secret_2026',
  resave: false,
  saveUninitialized: false
}));

const getMenu = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'menu.json'), 'utf8');
  return JSON.parse(data);
};

const getEvents = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'events.json'), 'utf8');
  return JSON.parse(data);
};

const getReviews = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'reviews.json'), 'utf8');
  return JSON.parse(data);
};

app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  if (!req.session.stamps) req.session.stamps = 0;
  if (!req.session.points) req.session.points = 0;
  res.locals.cart = req.session.cart;
  res.locals.cartTotal = req.session.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.locals.cartCount = req.session.cart.reduce((sum, item) => sum + item.qty, 0);
  res.locals.stamps = req.session.stamps;
  res.locals.points = req.session.points;
  next();
});

app.get('/', (req, res) => {
  const menu = getMenu();
  const featured = menu.filter(item => ['golden-hour-latte', 'rosemary-bloom', 'minty-matcha', 'avocado-toast', 'matcha-tiramisu', 'truffle-fries'].includes(item.id));
  const events = getEvents().slice(0, 3);
  const reviews = getReviews().slice(0, 4);
  res.render('index', { menu: featured, events, reviews });
});

app.get('/menu', (req, res) => {
  const menu = getMenu();
  const category = req.query.category || 'all';
  const diet = req.query.diet || 'all';
  let filtered = category === 'all' ? menu : menu.filter(item => item.category === category);
  if (diet !== 'all') {
    filtered = filtered.filter(item => item.tags && item.tags.includes(diet));
  }
  res.render('menu', {
    menu: filtered,
    activeCategory: category,
    activeDiet: diet,
    allCategories: ['all', 'coffee', 'specialty', 'food', 'desserts'],
    allDiets: ['all', 'vegan', 'gluten-free', 'vegetarian']
  });
});

app.get('/menu/:id', (req, res) => {
  const menu = getMenu();
  const item = menu.find(i => i.id === req.params.id);
  if (!item) return res.redirect('/menu');
  res.json(item);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact form: ${name} (${email}): ${message}`);
  res.render('contact', { success: `Thanks for reaching out, ${name}! We'll reply within 24 hours.` });
});

app.get('/reservations', (req, res) => {
  res.render('reservations');
});

app.post('/reservations', (req, res) => {
  const { name, email, date, time, guests, notes } = req.body;
  console.log(`Reservation: ${name} (${email}) - ${guests} guests on ${date} at ${time}. Notes: ${notes}`);
  res.render('reservations', {
    success: `Your table for ${guests} on ${date} at ${time} is confirmed, ${name}! A confirmation has been sent to ${email}.`
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
  res.redirect(req.get('Referer') || '/menu');
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
  const totalItems = req.session.cart.reduce((sum, i) => sum + i.qty, 0);
  req.session.points = (req.session.points || 0) + totalItems;
  req.session.stamps = (req.session.stamps || 0) + totalItems;
  req.session.cart = [];
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.get('/events', (req, res) => {
  const events = getEvents();
  res.render('events', { events });
});

app.get('/giftcards', (req, res) => {
  res.render('giftcards');
});

app.post('/giftcards', (req, res) => {
  const { amount, recipient, message, sender } = req.body;
  console.log(`Gift card: $${amount} for ${recipient} from ${sender}. Message: ${message}`);
  res.render('giftcards', { success: `Your $${amount} digital gift card has been sent to ${recipient}!` });
});

app.get('/loyalty', (req, res) => {
  res.render('loyalty');
});

app.post('/loyalty/redeem', (req, res) => {
  if (req.session.points >= 50) {
    req.session.points -= 50;
    res.render('loyalty', { success: 'You redeemed 50 points for a free drink!' });
  } else {
    res.render('loyalty', { error: `You need ${50 - req.session.points} more points for a free drink.` });
  }
});

app.post('/newsletter', (req, res) => {
  const { email } = req.body;
  console.log(`Newsletter signup: ${email}`);
  res.json({ success: true, message: 'Welcome to the cafe family! Check your inbox for a welcome offer.' });
});

app.post('/chat', (req, res) => {
  const { message } = req.body;
  const responses = [
    "Our hours are Mon-Fri 7am-9pm, Sat-Sun 8am-10pm!",
    "We have plenty of vegan and gluten-free options on our menu!",
    "You can reserve a table on our Reservations page.",
    "Free Wi-Fi is available for all guests!",
    "Our most popular drink is the Golden Hour Latte!",
    "We offer both pickup and delivery through our online ordering system.",
    "Yes, we have outdoor seating available!",
    "Check our Events page for live music and specials!"
  ];
  const reply = responses[Math.floor(Math.random() * responses.length)];
  res.json({ reply });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Cafe Serenity running on http://localhost:${PORT}`);
  });
}
module.exports = app;
