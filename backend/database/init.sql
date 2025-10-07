-- Crear tablas para e-commerce mundial de fútbol

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(50),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Insertar datos iniciales
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@mundial.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

INSERT INTO products (name, description, price, stock, category, image_url) VALUES 
('Camiseta Argentina 2026', 'Camiseta oficial selección Argentina para el mundial 2026', 89.99, 50, 'camisetas', '/assets/images/argentina-jersey.jpg'),
('Balón Oficial Mundial 2026', 'Balón oficial del mundial 2026', 129.99, 30, 'balones', '/assets/images/balon-oficial.jpg'),
('Gorra Brasil 2026', 'Gorra oficial Brasil para el mundial 2026', 29.99, 100, 'accesorios', '/assets/images/gorra-brasil.jpg');