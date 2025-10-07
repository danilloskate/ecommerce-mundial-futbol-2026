const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const { user_id, items, total, shipping_address } = req.body;
    
    // Create order
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, total, shipping_address, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id || 1, total, shipping_address, 'confirmed']
    );
    
    const order = orderResult.rows[0];
    
    // Add order items
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.id, item.quantity, item.price]
      );
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/my-orders', async (req, res) => {
  try {
    const userId = req.query.user_id || 1; // Simulated user
    
    const result = await pool.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'name', p.name,
                 'quantity', oi.quantity,
                 'price', oi.price
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;