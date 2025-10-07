const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRouter = require('../routes/auth');

jest.mock('../config/database', () => ({
  query: jest.fn()
}));

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const pool = require('../config/database');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123'
      };

      pool.query
        .mockResolvedValueOnce({ rows: [] }) // Email check
        .mockResolvedValueOnce({ rows: [{ id: 1, name: userData.name, email: userData.email, role: 'user' }] }); // Insert user

      bcrypt.hash.mockResolvedValue('hashedPassword');

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Usuario creado exitosamente');
    });

    it('should return error for existing email', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'existing@test.com',
          password: 'password'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('El usuario ya existe');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        role: 'user'
      };

      pool.query.mockResolvedValue({ rows: [mockUser] });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mockToken');
      expect(response.body.user.email).toBe('test@test.com');
    });

    it('should return error for invalid credentials', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@test.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Credenciales inválidas');
    });
  });
});