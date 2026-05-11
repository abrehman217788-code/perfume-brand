const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

let isOfflineMode = false;

router.post('/reservations', async (req, res) => {
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

module.exports = router;
