const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    id: Number,
    name: String,
    price: Number
  }],
  total: Number,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Confirmed' },
  userEmail: String
});

module.exports = mongoose.model('Order', orderSchema);
