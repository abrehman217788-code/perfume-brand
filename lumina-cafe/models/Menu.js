const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Menu', menuSchema);
