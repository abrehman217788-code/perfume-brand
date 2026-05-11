const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'All' },
  isNewDrop: { type: Boolean, default: false },
  isSoldOut: { type: Boolean, default: false },
  details: [String]
});

module.exports = mongoose.model('Product', productSchema);
