#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🔨 Instalando dependencias..."
pip install --upgrade pip
pip install -r recetas/requirements.txt

echo "📦 Recolectando archivos estáticos..."
cd recetas
python manage.py collectstatic --no-input

echo "🗄️ Aplicando migraciones..."
python manage.py migrate --noinput

echo "✅ Build completado!"
