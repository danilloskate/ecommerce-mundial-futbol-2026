#!/bin/bash

echo "🧪 Ejecutando todas las pruebas del proyecto E-commerce Mundial de Fútbol"
echo "=================================================================="

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar resultados
show_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2 - PASARON${NC}"
    else
        echo -e "${RED}❌ $2 - FALLARON${NC}"
    fi
}

# Pruebas del Backend
echo -e "${YELLOW}🔧 Ejecutando pruebas del Backend...${NC}"
cd backend
npm test
BACKEND_RESULT=$?
cd ..

show_result $BACKEND_RESULT "Pruebas del Backend"

# Pruebas del Frontend
echo -e "${YELLOW}🎨 Ejecutando pruebas del Frontend...${NC}"
cd frontend
npm test -- --watch=false --browsers=ChromeHeadless
FRONTEND_RESULT=$?
cd ..

show_result $FRONTEND_RESULT "Pruebas del Frontend"

# Resumen final
echo "=================================================================="
if [ $BACKEND_RESULT -eq 0 ] && [ $FRONTEND_RESULT -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡Todas las pruebas pasaron exitosamente!${NC}"
    exit 0
else
    echo -e "${RED}💥 Algunas pruebas fallaron. Revisa los logs arriba.${NC}"
    exit 1
fi