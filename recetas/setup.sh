#!/bin/bash

echo "===================================="
echo " Instalación - Sistema de Recetas"
echo "===================================="
echo ""

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 no está instalado"
    echo "Instala Python3 desde tu gestor de paquetes"
    exit 1
fi

echo "[1/5] Creando entorno virtual..."
python3 -m venv venv
if [ $? -ne 0 ]; then
    echo "ERROR: No se pudo crear el entorno virtual"
    exit 1
fi

echo "[2/5] Activando entorno virtual..."
source venv/bin/activate

echo "[3/5] Instalando dependencias (esto puede tardar varios minutos)..."
pip install --upgrade pip
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: No se pudieron instalar las dependencias"
    exit 1
fi

echo "[4/5] Creando base de datos..."
python manage.py migrate

echo "[5/5] Verificando instalación..."
python -c "import django; import tensorflow; import transformers; print('OK')" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "ERROR: Algunos paquetes no se instalaron correctamente"
    exit 1
fi

# Hacer ejecutable el script de ejecución
chmod +x run.sh

echo ""
echo "===================================="
echo " Instalación completada exitosamente"
echo "===================================="
echo ""
echo "Para iniciar el servidor ejecuta:"
echo "  ./run.sh"
echo ""
echo "O manualmente:"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
