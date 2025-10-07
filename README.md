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
- **S**: Cada clase tiene una responsabilidad única
- **O**: Abierto para extensión, cerrado para modificación
- **L**: Principio de sustitución de Liskov
- **I**: Segregación de interfaces
- **D**: Inversión de dependencias

### DRY (Don't Repeat Yourself)
- **Servicios reutilizables**: AuthService, ProductService compartidos en múltiples componentes
- **Middleware centralizado**: JWT middleware aplicado en múltiples rutas del backend
- **Pipes personalizados**: ColombianCurrencyPipe usado en toda la aplicación
- **Configuración única**: Pool de conexiones PostgreSQL centralizado
- **Interfaces TypeScript**: Modelos compartidos entre servicios y componentes
- **Estilos centralizados**: Tema Davivienda aplicado globalmente
- **HTTP Interceptors**: Token JWT agregado automáticamente a todas las requests
- **Scripts automatizados**: test-all.sh para ejecutar todas las pruebas
- **Funciones helper**: Validaciones y utilidades reutilizadas

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
- **[API Documentation](backend/README.md)** - Endpoints y ejemplos de uso
- **[Frontend Guide](frontend/README.md)** - Componentes y servicios

## 👥 Credenciales de Prueba

- **Admin**: `admin@mundial.com` / `admin123`
- **Usuario**: Crear cuenta nueva en el registro

## 📊 Demo

![Demo Screenshot](https://via.placeholder.com/800x400/d32f2f/ffffff?text=E-commerce+Mundial+de+F%C3%BAtbol+2026)

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