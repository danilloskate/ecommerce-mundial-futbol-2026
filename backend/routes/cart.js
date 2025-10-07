const express = require('express');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validar stock y calcular total
router.post('/validate', auth, async (req, res) => {
  try {
    const { items } = req.body;
    const validatedItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ message: `Producto ${item.productId} no encontrado` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      validatedItems.push({
        product: product,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemTotal
      });
    }

    res.json({ items: validatedItems, total });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;