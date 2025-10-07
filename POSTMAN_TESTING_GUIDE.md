# 🧪 Guía de Testing con Postman - E-commerce Mundial Fútbol 2026

## 📋 Configuración Inicial

### **1. Importar Archivos en Postman**

1. **Abrir Postman**
2. **Importar Colección**:
   - File → Import
   - Seleccionar `E-commerce-Mundial-Futbol-2026.postman_collection.json`
3. **Importar Environment**:
   - Environments → Import
   - Seleccionar `E-commerce-Mundial-Futbol-2026.postman_environment.json`
4. **Activar Environment**:
   - Seleccionar "E-commerce Mundial Fútbol 2026 - Environment" en el dropdown

### **2. Preparar Backend**

```bash
# Terminal 1: Base de datos
docker-compose up -d

# Terminal 2: Backend
cd backend
npm install
npm run dev
```

**Verificar que el servidor esté corriendo en:** `http://localhost:3000`

## 🚀 Secuencia de Testing Recomendada

### **Paso 1: Verificar Conexión**
```
🔧 Utilidades → Test Conexión Base de Datos
```
- **Método**: GET `/api/test`
- **Resultado esperado**: 200 OK con timestamp de la base de datos

### **Paso 2: Autenticación**
```
🔐 Autenticación → Registro de Admin
🔐 Autenticación → Registro de Usuario  
🔐 Autenticación → Login Admin
🔐 Autenticación → Login Usuario
```

**Datos de prueba incluidos:**
- **Admin**: admin@mundial.com / admin123
- **Usuario**: juan@test.com / password123

### **Paso 3: Gestión de Productos**
```
🛍️ Productos → Crear Producto - Camiseta Colombia
🛍️ Productos → Crear Producto - Balón Oficial
🛍️ Productos → Crear Producto - Gorra
🛍️ Productos → Listar Todos los Productos
🛍️ Productos → Filtrar Productos por Categoría
🛍️ Productos → Actualizar Producto
🛍️ Productos → Reducir Stock de Producto
```

### **Paso 4: Carrito de Compras**
```
🛒 Carrito → Validar Carrito
🛒 Carrito → Validar Carrito - Stock Insuficiente
```

### **Paso 5: Órdenes**
```
📦 Órdenes → Crear Orden
📦 Órdenes → Obtener Mis Órdenes
📦 Órdenes → Crear Orden Completa - Ejemplo
```

## 📊 Casos de Prueba Incluidos

### **✅ Casos de Éxito**

#### **Autenticación**
- Registro exitoso de usuario y admin
- Login exitoso con credenciales válidas
- Tokens JWT generados automáticamente

#### **Productos**
- Crear productos de diferentes categorías
- Listar productos con y sin filtros
- Actualizar información de productos
- Reducir stock correctamente
- Eliminar productos

#### **Carrito**
- Validar carrito con productos válidos
- Calcular total correctamente
- Verificar disponibilidad de stock

#### **Órdenes**
- Crear órdenes con múltiples productos
- Obtener historial de órdenes por usuario
- Procesar órdenes completas

### **❌ Casos de Error**

#### **Autenticación**
- Registro con email duplicado
- Login con credenciales incorrectas

#### **Productos**
- Reducir stock más allá del disponible
- Actualizar producto inexistente
- Eliminar producto inexistente

#### **Carrito**
- Validar carrito con stock insuficiente
- Validar carrito con productos inexistentes

## 🔧 Variables de Environment

### **Automáticas (se llenan solas)**
- `authToken` - Token JWT del usuario
- `adminToken` - Token JWT del admin
- `userId` - ID del usuario logueado
- `adminId` - ID del admin logueado
- `productId1` - ID del primer producto creado
- `productId2` - ID del segundo producto creado
- `orderId` - ID de la última orden creada

### **Configurables**
- `baseUrl` - URL base del API (http://localhost:3000)

## 📋 Scripts Automáticos Incluidos

### **Login Automático**
```javascript
// Guarda automáticamente el token JWT
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set('authToken', response.token);
    pm.environment.set('userId', response.user.id);
}
```

### **Creación de Productos**
```javascript
// Guarda automáticamente los IDs de productos
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set('productId1', response.id);
}
```

## 🎯 Datos de Prueba Realistas

### **Productos Incluidos**
1. **Camiseta Selección Colombia** - $350,000 COP
2. **Balón Oficial Mundial 2026** - $520,000 COP  
3. **Gorra Mundial 2026** - $85,000 COP

### **Categorías**
- `camisetas` - Camisetas oficiales
- `balones` - Balones y pelotas
- `accesorios` - Gorras, bufandas, etc.
- `souvenirs` - Recuerdos y coleccionables

### **Direcciones de Envío**
```json
{
  "street": "Calle 123 #45-67",
  "city": "Bogotá", 
  "country": "Colombia",
  "zipCode": "110111"
}
```

## 🚨 Troubleshooting

### **Error: ECONNREFUSED**
- Verificar que el backend esté corriendo en puerto 3000
- Ejecutar: `cd backend && npm run dev`

### **Error: Database connection failed**
- Verificar que PostgreSQL esté corriendo
- Ejecutar: `docker-compose up -d`

### **Error: Token inválido**
- Ejecutar primero el login correspondiente
- Verificar que el token se guardó en las variables

### **Error: Producto no encontrado**
- Crear productos primero antes de usarlos
- Verificar que los IDs se guardaron correctamente

## 📈 Métricas de Testing

### **Cobertura Completa**
- ✅ 9 endpoints principales
- ✅ 20+ casos de prueba
- ✅ Casos de éxito y error
- ✅ Validaciones de negocio
- ✅ Autenticación JWT
- ✅ Gestión de stock
- ✅ Flujo completo de compra

### **Automatización**
- ✅ Variables automáticas
- ✅ Scripts de post-procesamiento
- ✅ Tokens JWT automáticos
- ✅ IDs de recursos dinámicos

¡Con esta colección puedes probar completamente toda la funcionalidad del backend de forma automatizada! 🚀