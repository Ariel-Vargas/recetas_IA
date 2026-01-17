#!/bin/bash
# Script de build para Vercel

echo "🔨 Building for Vercel..."

# Instalar dependencias
pip install -r requirements-vercel.txt

# Crear directorio de archivos estáticos
python recetas/manage.py collectstatic --noinput

echo "✅ Build complete!"
