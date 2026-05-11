const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Menu = require('../models/Menu');

let isOfflineMode = false;

const getMenuItems = async () => {
  if (!isOfflineMode) {
    try {
      const items = await Menu.find({});
      if (items.length > 0) return items;
    } catch (e) {
      console.error('Error fetching from DB:', e);
    }
  }
  const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'menuItems.json'), 'utf8');
  return JSON.parse(data);
};

router.get('/', async (req, res) => {
  const menuItems = await getMenuItems();
  res.render('index', { menuItems });
});

router.get('/menu', async (req, res) => {
  const menuItems = await getMenuItems();
  res.render('menu', { menuItems });
});

router.get('/menu/category/:category', async (req, res) => {
  const allItems = await getMenuItems();
  const category = req.params.category;
  const menuItems = allItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
  res.render('menu', { menuItems });
});

router.get('/reservations', (req, res) => {
  res.render('reservations', { success: null, error: null });
});

router.get('/experience', (req, res) => {
  res.render('experience');
});

module.exports = router;
