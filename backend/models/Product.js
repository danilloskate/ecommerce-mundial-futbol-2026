const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    required: true,
    enum: ['camisetas', 'balones', 'accesorios', 'souvenirs']
  },
  team: { type: String, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);