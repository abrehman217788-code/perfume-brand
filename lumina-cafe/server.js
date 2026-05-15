const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let isOfflineMode = false;
mongoose.connect('mongodb://localhost:27017/lumina_cafe')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection failed, running in offline mode.');
    isOfflineMode = true;
  });

const Menu = require('./models/Menu');
const Reservation = require('./models/Reservation');

const getMenuItems = async () => {
  if (!isOfflineMode) {
    try {
      const items = await Menu.find({});
      if (items.length > 0) return items;
    } catch (e) {
      console.error('Error fetching from DB:', e);
    }
  }
  const data = fs.readFileSync(path.join(__dirname, 'data', 'menuItems.json'), 'utf8');
  return JSON.parse(data);
};

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.get('/', async (req, res) => {
  const menuItems = await getMenuItems();
  res.render('index', { menuItems });
});

app.get('/menu', async (req, res) => {
  const menuItems = await getMenuItems();
  res.render('menu', { menuItems });
});

app.get('/menu/category/:category', async (req, res) => {
  const allItems = await getMenuItems();
  const category = req.params.category;
  const menuItems = allItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
  res.render('menu', { menuItems });
});

app.get('/reservations', (req, res) => {
  res.render('reservations', { success: null, error: null });
});

app.get('/experience', (req, res) => {
  res.render('experience');
});

app.post('/api/reservations', async (req, res) => {
  try {
    const { name, email, date, time, guests, notes } = req.body;
    if (!name || !email || !date || !time || !guests) {
      return res.render('reservations', { success: null, error: 'Please fill in all required fields.' });
    }
    if (!isOfflineMode) {
      await Reservation.create({ name, email, date, time, guests, notes });
    }
    res.render('reservations', { success: 'Reservation confirmed! We look forward to serving you.', error: null });
  } catch (err) {
    res.render('reservations', { success: null, error: 'Something went wrong. Please try again.' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Lumina Cafe server running on port ${PORT}`);
  });
}
module.exports = app;
