const request = require('supertest');
const express = require('express');
const productsRouter = require('../routes/products');

// Mock de la base de datos
jest.mock('../config/database', () => ({
  query: jest.fn()
}));

const pool = require('../config/database');

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);

describe('Products API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const mockProducts = [
        { id: 1, name: 'Camiseta Colombia', price: 350000, stock: 10 },
        { id: 2, name: 'Balón Oficial', price: 520000, stock: 5 }
      ];

      pool.query.mockResolvedValue({ rows: mockProducts });

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM products', []);
    });

    it('should filter products by category', async () => {
      const mockProducts = [
        { id: 1, name: 'Camiseta Colombia', category: 'camisetas', price: 350000 }
      ];

      pool.query.mockResolvedValue({ rows: mockProducts });

      const response = await request(app).get('/api/products?category=camisetas');

      expect(response.status).toBe(200);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM products WHERE category = $1', ['camisetas']);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Nueva Camiseta',
        description: 'Descripción',
        price: 300000,
        stock: 15,
        category: 'camisetas',
        image_url: 'image.jpg'
      };

      const mockCreatedProduct = { id: 3, ...newProduct };
      pool.query.mockResolvedValue({ rows: [mockCreatedProduct] });

      const response = await request(app)
        .post('/api/products')
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedProduct);
    });
  });

  describe('POST /api/products/reduce-stock', () => {
    it('should reduce product stock', async () => {
      const mockProduct = { id: 1, stock: 8 };
      pool.query.mockResolvedValue({ rows: [mockProduct] });

      const response = await request(app)
        .post('/api/products/reduce-stock')
        .send({ productId: 1, quantity: 2 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProduct);
    });

    it('should return error for insufficient stock', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .post('/api/products/reduce-stock')
        .send({ productId: 1, quantity: 20 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Stock insuficiente');
    });
  });
});