#!/bin/bash

echo "===================================="
echo " Sistema de Recetas con IA - BERT"
echo "===================================="
echo ""

# Activar entorno virtual si existe
if [ -f "venv/bin/activate" ]; then
    echo "Activando entorno virtual..."
    source venv/bin/activate
else
    echo "ADVERTENCIA: No se encontró el entorno virtual"
    echo "Ejecuta: python3 -m venv venv"
    echo ""
fi

# Verificar si Django está instalado
python -c "import django" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "ERROR: Django no está instalado"
    echo "Ejecuta: pip install -r requirements.txt"
    exit 1
fi

echo ""
echo "Iniciando servidor Django..."
echo "Accede a: http://localhost:8000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

python manage.py runserver
