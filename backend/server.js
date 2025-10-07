const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const productsRouter = require('./routes/products');
const uploadRouter = require('./routes/upload');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});