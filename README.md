# 🏆 E-commerce Mundial de Fútbol 2026

[![Angular](https://img.shields.io/badge/Angular-17-red)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue)](https://typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Descripción
Tienda online full-stack especializada en productos del Mundial de Fútbol 2026 con carrito de compras, sistema de checkout completo y panel de administración. Desarrollada con arquitectura moderna y patrones de diseño robustos.

## Tecnologías
- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: Angular 17 + TypeScript + Angular Material
- **Base de datos**: PostgreSQL (Docker)
- **Autenticación**: JWT + bcrypt
- **Testing**: Jest (Backend) + Jasmine/Karma (Frontend)
- **Moneda**: Pesos Colombianos (COP)

## Características Implementadas
- ✅ Sistema de autenticación completo (registro/login)
- ✅ Gestión CRUD de productos con panel admin
- ✅ Carrito de compras funcional con validaciones
- ✅ Proceso de checkout con formulario de pago
- ✅ Gestión de órdenes por usuario
- ✅ Control de stock en tiempo real
- ✅ Subida de imágenes de productos
- ✅ Roles de usuario (admin/usuario)
- ✅ Interfaz responsive con Material Design
- ✅ Tema personalizado Davivienda (rojo/amarillo)
- ✅ Formateo de precios en pesos colombianos
- ✅ Historial de órdenes por usuario

## Instalación

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- Angular CLI 17+

### Base de Datos (PostgreSQL con Docker)
```bash
# Levantar PostgreSQL
docker-compose up -d

# Verificar que está corriendo
docker ps

# Conectar a la base de datos (opcional)
docker exec -it ecommerce-postgres psql -U admin -d ecommerce_mundial
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Ejecutar Pruebas

#### Backend (Jest)
```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

#### Frontend (Jasmine/Karma)
```bash
cd frontend
npm test
npm run test:watch
npm run test:coverage
```

## Estructura del Proyecto

### Backend
```
backend/
├── config/
│   └── database.js          # Configuración PostgreSQL
├── database/
│   └── init.sql            # Scripts de inicialización
├── routes/
│   ├── auth.js             # Autenticación (registro/login)
│   ├── products.js         # CRUD productos
│   ├── orders.js           # Gestión de órdenes
│   ├── cart.js             # Validación de carrito
│   └── upload.js           # Subida de imágenes
├── models/
│   ├── User.js             # Modelo de usuario
│   ├── Product.js          # Modelo de producto
│   └── Order.js            # Modelo de orden
├── middleware/
│   └── auth.js             # Middleware JWT
├── tests/                  # Pruebas unitarias Jest
├── .env                    # Variables de entorno
└── server.js               # Servidor Express
```

### Frontend
```
frontend/src/app/
├── components/
│   ├── home/               # Página principal
│   ├── products/           # Lista de productos
│   ├── cart/               # Carrito de compras
│   ├── checkout/           # Proceso de pago
│   ├── login/              # Inicio de sesión
│   ├── register/           # Registro de usuario
│   ├── admin/              # Panel de administración
│   ├── orders/             # Historial de órdenes
│   ├── header/             # Navegación principal
│   └── success/            # Confirmación de compra
├── services/
│   ├── auth.service.ts     # Servicio de autenticación
│   ├── product.service.ts  # Servicio de productos
│   ├── cart.service.ts     # Servicio del carrito
│   ├── order.service.ts    # Servicio de órdenes
│   └── auth.interceptor.ts # Interceptor JWT
├── models/
│   ├── user.model.ts       # Modelo de usuario
│   ├── product.model.ts    # Modelo de producto
│   ├── order.model.ts      # Modelo de orden
│   └── cart.model.ts       # Modelo del carrito
├── guards/
│   └── auth.guard.ts       # Guard de autenticación
├── pipes/
│   └── currency.pipe.ts    # Pipe para formato COP
└── tests/                  # Pruebas unitarias
```

## API Endpoints

### 🔐 Autenticación
- `POST /api/auth/register` - Registro de usuario
  ```json
  {
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "password": "password123",
    "role": "user"
  }
  ```
- `POST /api/auth/login` - Inicio de sesión
  ```json
  {
    "email": "juan@test.com",
    "password": "password123"
  }
  ```

### 🛏️ Productos
- `GET /api/products` - Listar todos los productos
- `GET /api/products?category=camisetas` - Filtrar por categoría
- `POST /api/products` - Crear nuevo producto
  ```json
  {
    "name": "Camiseta Colombia",
    "description": "Camiseta oficial",
    "price": 350000,
    "stock": 25,
    "category": "camisetas",
    "image_url": "colombia.jpg"
  }
  ```
- `PUT /api/products/:id` - Actualizar producto existente
- `DELETE /api/products/:id` - Eliminar producto
- `POST /api/products/reduce-stock` - Reducir stock (para ventas)
  ```json
  {
    "productId": 1,
    "quantity": 3
  }
  ```

### 🛍️ Carrito
- `POST /api/cart/validate` - Validar carrito y calcular total
  ```json
  {
    "items": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 1
      }
    ]
  }
  ```

### 📦 Órdenes
- `POST /api/orders` - Crear nueva orden
  ```json
  {
    "user_id": 1,
    "items": [
      {
        "id": 1,
        "quantity": 2,
        "price": 350000
      }
    ],
    "total": 700000,
    "shipping_address": {
      "street": "Calle 123 #45-67",
      "city": "Bogotá",
      "country": "Colombia",
      "zipCode": "110111"
    }
  }
  ```
- `GET /api/orders/my-orders?user_id=1` - Obtener órdenes del usuario

### 🔧 Utilidades
- `GET /api/test` - Verificar conexión con base de datos
- `POST /api/upload` - Subir imágenes de productos

## Principios Aplicados

### SOLID

#### **S - Single Responsibility Principle (Responsabilidad Única)**
Cada clase/servicio tiene una sola razón para cambiar:
- **AuthService**: Solo maneja autenticación (login, registro, tokens)
- **ProductService**: Solo gestiona productos (CRUD, stock)
- **CartService**: Solo maneja carrito (agregar, remover, calcular)
- **OrderService**: Solo gestiona órdenes (crear, consultar)
- **AuthGuard**: Solo protege rutas
- **ColombianCurrencyPipe**: Solo formatea moneda

#### **O - Open/Closed Principle (Abierto/Cerrado)**
Abierto para extensión, cerrado para modificación:
- **Servicios Angular**: Nuevos métodos sin modificar existentes
- **Middleware Express**: Nuevos middlewares sin cambiar los actuales
- **Interfaces TypeScript**: Extensibles con nuevas propiedades
- **Componentes**: Reutilizables con diferentes inputs

#### **L - Liskov Substitution Principle (Sustitución de Liskov)**
Subclases sustituibles por sus clases base:
- **Interfaces Product**: Diferentes implementaciones (ProductModel, ProductDTO)
- **Guards**: AuthGuard intercambiable con otros guards
- **Pipes**: ColombianCurrencyPipe sustituible por otros pipes de formato

#### **I - Interface Segregation Principle (Segregación de Interfaces)**
Interfaces específicas, no genéricas:
- **User**: Separado de UserAuth y UserProfile
- **Product**: Separado de ProductCreate y ProductUpdate
- **Order**: Separado de OrderCreate y OrderItem
- **API Responses**: Interfaces específicas por endpoint

#### **D - Dependency Inversion Principle (Inversión de Dependencias)**
Depender de abstracciones, no de concreciones:
- **Angular DI**: Servicios inyectados, no instanciados directamente
- **Database Pool**: Configuración abstracta, implementación específica
- **HTTP Client**: Abstracción de Angular, no fetch directo
- **JWT Strategy**: Abstracción de autenticación

### DRY (Don't Repeat Yourself)

#### **Frontend - Reutilización Angular**
- **AuthService**: Compartido en Login, Register, Header, Guards
  ```typescript
  // Usado en 5+ componentes
  constructor(private authService: AuthService) {}
  ```
- **ProductService**: Reutilizado en Products, Admin, Cart
  ```typescript
  // Un servicio, múltiples consumidores
  getProducts(), createProduct(), updateProduct()
  ```
- **ColombianCurrencyPipe**: Usado en Products, Cart, Orders, Checkout
  ```html
  <!-- Mismo pipe en toda la app -->
  {{ price | colombianCurrency }}
  ```
- **HTTP Interceptor**: Token JWT automático en TODAS las requests
  ```typescript
  // Una configuración, todas las llamadas protegidas
  req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  ```

#### **Backend - Reutilización Node.js**
- **Database Pool**: Una configuración, todas las rutas
  ```javascript
  // config/database.js - Usado en auth.js, products.js, orders.js
  const pool = require('../config/database');
  ```
- **Auth Middleware**: Aplicado en múltiples rutas
  ```javascript
  // middleware/auth.js - Reutilizado en 4+ rutas
  app.use('/api/products', authMiddleware);
  app.use('/api/orders', authMiddleware);
  ```
- **Error Handling**: Patrón consistente
  ```javascript
  // Mismo patrón en todas las rutas
  try { /* lógica */ } catch (error) { 
    res.status(500).json({ error: error.message }); 
  }
  ```

#### **Configuración Centralizada**
- **Environment Variables**: Un .env para todo el backend
  ```bash
  # Una configuración, múltiples usos
  DB_HOST, DB_PORT, JWT_SECRET, CORS_ORIGIN
  ```
- **Angular Material Theme**: Un tema para toda la app
  ```scss
  // styles.css - Colores Davivienda globales
  --primary-color: #d32f2f; --accent-color: #ffc107;
  ```
- **TypeScript Interfaces**: Modelos compartidos
  ```typescript
  // models/ - Reutilizados en servicios y componentes
  export interface Product, User, Order, CartItem
  ```

#### **Scripts y Automatización**
- **test-all.sh**: Un script para todas las pruebas
  ```bash
  # Backend + Frontend en un comando
  cd backend && npm test && cd ../frontend && npm test
  ```
- **Docker Compose**: Una configuración para desarrollo
  ```yaml
  # docker-compose.yml - PostgreSQL para todo el equipo
  services: postgres: image: postgres:15
  ```

#### **Validaciones Reutilizables**
- **Email Validation**: Misma lógica en frontend y backend
- **Stock Validation**: Reutilizada en cart.js y products.js
- **JWT Validation**: Centralizada en middleware/auth.js
- **CORS Configuration**: Una configuración para todos los endpoints

### Beneficios Logrados

#### **Mantenibilidad**
- ✅ Cambios en un lugar se reflejan en toda la app
- ✅ Código predecible y consistente
- ✅ Fácil debugging y testing

#### **Escalabilidad**
- ✅ Nuevos componentes reutilizan servicios existentes
- ✅ Nuevas rutas reutilizan middleware existente
- ✅ Nuevas funcionalidades siguen patrones establecidos

#### **Productividad**
- ✅ Desarrollo más rápido con componentes reutilizables
- ✅ Menos bugs por código duplicado
- ✅ Testing más eficiente con mocks centralizados

## Base de Datos

### Tablas Principales
- **users**: Usuarios con roles (admin/user)
- **products**: Productos con stock y categorías
- **orders**: Órdenes de compra
- **order_items**: Items de cada orden

### Datos de Prueba
- **Admin**: admin@mundial.com / admin123
- **Productos**: Camisetas ($350,000 COP), Balones ($520,000 COP), Accesorios
- **Base de datos**: admin / admin123 (localhost:5432)

## Funcionalidades Clave

### Sistema de Autenticación
- Registro con validación de email único
- Login con JWT tokens
- Roles diferenciados (admin/usuario)
- Guards para rutas protegidas

### Gestión de Productos
- CRUD completo para administradores
- Subida de imágenes
- Control de stock automático
- Filtrado por categorías

### Carrito y Checkout
- Carrito persistente en localStorage
- Validación de stock antes del checkout
- Formulario de pago con validaciones
- Reducción automática de stock

### Panel de Administración
- Gestión completa de productos
- Vista de todas las órdenes
- Subida de imágenes de productos

## Testing

### Configuración de Pruebas

#### Backend (Jest + Supertest)
```bash
cd backend
npm test                 # Ejecutar todas las pruebas
npm run test:watch      # Modo watch
npm run test:coverage   # Con cobertura de código
```

**Pruebas Implementadas:**
- ✅ `products.test.js` - CRUD de productos y reducción de stock
- ✅ `auth.test.js` - Registro, login y validaciones
- ✅ Mocking de base de datos PostgreSQL
- ✅ Pruebas de endpoints con Supertest

#### Frontend (Jasmine/Karma)
```bash
cd frontend
npm test                 # Ejecutar todas las pruebas
npm run test:watch      # Modo watch
npm run test:coverage   # Con cobertura de código
```

**Pruebas Implementadas:**
- ✅ `product.service.spec.ts` - Servicio de productos
- ✅ `auth.service.spec.ts` - Servicio de autenticación
- ✅ `currency.pipe.spec.ts` - Pipe de formato COP
- ✅ `products.component.spec.ts` - Componente de productos
- ✅ Mocking de HttpClient y servicios

#### Ejecutar Todas las Pruebas
```bash
# Script automatizado para todo el proyecto
./test-all.sh
```

### Cobertura de Pruebas

#### Backend
- **Rutas**: products.js, auth.js
- **Funcionalidades**: CRUD, autenticación, validaciones
- **Casos**: éxito, errores, edge cases

#### Frontend
- **Servicios**: ProductService, AuthService
- **Componentes**: ProductsComponent
- **Pipes**: CurrencyPipe
- **Casos**: rendering, interacciones, API calls

## Despliegue

### Desarrollo
```bash
# Terminal 1: Base de datos
docker-compose up -d

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
cd frontend && npm start
```

### URLs
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000/api
- **PostgreSQL**: localhost:5432

## 🚀 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/danilloskate/ecommerce-mundial-futbol-2026.git
cd ecommerce-mundial-futbol-2026

# Levantar base de datos
docker-compose up -d

# Backend
cd backend && npm install && npm run dev

# Frontend (nueva terminal)
cd frontend && npm install && npm start
```

## 📚 Documentación

- **[Documentación Técnica Completa](DOCUMENTACION_TECNICA.md)** - Arquitectura, patrones y detalles técnicos


## 👥 Credenciales de Prueba

- **Admin**: `admin@mundial.com` / `admin123`
- **Usuario**: Crear cuenta nueva en el registro

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

**Desarrollador**: [Daniel Zapata](https://github.com/danilloskate)  
**Proyecto**: [E-commerce Mundial Fútbol 2026](https://github.com/danilloskate/ecommerce-mundial-futbol-2026)  
**Demo**: [Ver aplicación en vivo](https://github.com/danilloskate/ecommerce-mundial-futbol-2026)

---

⭐ **¡Dale una estrella si te gustó el proyecto!** ⭐
