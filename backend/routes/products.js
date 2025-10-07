const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// GET /api/products - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM products';
    let params = [];
    
    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Crear producto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, category, image_url } = req.body;
    
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, stock, category, image_url]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id - Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image_url } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [name, description, price, stock, category, image_url, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:id - Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products/reduce-stock - Reducir stock
router.post('/reduce-stock', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING *',
      [quantity, productId]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;