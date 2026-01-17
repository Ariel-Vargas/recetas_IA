# 🍝 Sistema de Sustitución de Ingredientes con BERT

Sistema inteligente para sugerir sustitutos de ingredientes en recetas usando modelos de lenguaje BERT (Bidirectional Encoder Representations from Transformers).

[![Deploy to GitHub Pages](https://github.com/TU-USUARIO/TU-REPO/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/TU-USUARIO/TU-REPO/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 Demo en Vivo

- **Frontend**: [https://TU-USUARIO.github.io/TU-REPO/](https://TU-USUARIO.github.io/TU-REPO/)
- **API Backend**: [Documentación de la API](recetas/API_EXAMPLES.md)

## 📋 Descripción

Este proyecto combina un **frontend estático** con un **backend inteligente** usando Machine Learning:

- 🎨 **Frontend Web**: Interfaz interactiva para explorar recetas y sustitutos de ingredientes
- 🤖 **API Backend**: Django REST Framework con modelo BERT para predicciones inteligentes
- 🧠 **Modelo ML**: BERT fine-tuned para clasificación de ingredientes en español

## ✨ Características

- ✅ Búsqueda de recetas por país
- ✅ Sugerencias inteligentes de sustitutos de ingredientes
- ✅ Predicción con IA usando BERT
- ✅ Interfaz moderna y responsive
- ✅ API REST documentada
- ✅ Despliegue automático a GitHub Pages

## 📁 Estructura del Proyecto

```
IA/
├── app/                    # Frontend (GitHub Pages)
│   ├── index.html         # Página principal
│   ├── recetas.html       # Explorador de recetas
│   ├── generar.html       # Generador de recetas
│   ├── sustitutos.html    # Confirmación de sustitutos
│   ├── detalle.html       # Detalle de receta
│   ├── config.js          # Configuración de API
│   ├── data.js            # Datos estáticos
│   └── *.css              # Estilos
├── recetas/               # Backend Django API
│   ├── config/           # Configuración Django
│   ├── ingredientes/     # App principal
│   ├── requirements.txt  # Dependencias Python
│   └── manage.py         # Script de gestión
├── modelo_exportado/      # Archivos del modelo ML (no en repo)
│   ├── model_weights.h5
│   ├── tokenizer/
│   └── label_encoder.pkl
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD para GitHub Pages
├── package.json          # Scripts de deploy
└── README.md            # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 16+ (para scripts de deploy)
- **Python** 3.9+ (para el backend)
- **Git** instalado
- Cuenta en **GitHub**

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

### 2️⃣ Instalar Dependencias

#### Para el Frontend (opcional, solo si vas a desplegar):

```bash
npm install
```

#### Para el Backend:

```bash
cd recetas

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3️⃣ Configurar Variables de Entorno

```bash
cd recetas
copy env.example .env    # Windows
# cp env.example .env    # Linux/Mac

# Editar .env y configurar:
# - SECRET_KEY (generar una nueva)
# - DEBUG=True (para desarrollo)
# - MODEL_PATH (ruta al modelo)
```

### 4️⃣ Ejecutar Localmente

#### Frontend (archivos estáticos):

Simplemente abre `app/index.html` en tu navegador, o usa un servidor local:

```bash
# Opción 1: Python
python -m http.server 8080 --directory app

# Opción 2: Node.js
npx serve app

# Luego abre: http://localhost:8080
```

#### Backend API:

```bash
cd recetas

# Aplicar migraciones
python manage.py migrate

# Ejecutar servidor
python manage.py runserver

# API disponible en: http://localhost:8000
```

## 📦 Despliegue

### Despliegue en GitHub Pages (Frontend)

#### Opción A: Automático con GitHub Actions (Recomendado)

1. **Habilitar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings > Pages
   - Source: **GitHub Actions**

2. **Push tu código:**
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

3. **¡Listo!** GitHub Actions desplegará automáticamente
   - Ve a Actions tab para ver el progreso
   - Tu sitio estará en: `https://TU-USUARIO.github.io/TU-REPO/`

#### Opción B: Manual con gh-pages

```bash
# Desplegar a GitHub Pages
npm run deploy

# Esto ejecuta:
# 1. npm run predeploy (preparación)
# 2. gh-pages -d app (publica la carpeta app/)
```

### Despliegue del Backend API

El backend Django con BERT debe desplegarse en una plataforma que soporte Python:

#### 🔵 Heroku

```bash
heroku create tu-app-nombre
git push heroku main
heroku run python recetas/manage.py migrate
```

[Ver guía completa de Heroku](DEPLOYMENT.md#heroku)

#### 🟣 Railway

1. Conecta tu repositorio en [railway.app](https://railway.app)
2. Railway detectará Django automáticamente
3. Configura variables de entorno

[Ver guía completa de Railway](DEPLOYMENT.md#railway)

#### 🟢 Render

1. Crea nuevo Web Service en [render.com](https://render.com)
2. Build: `cd recetas && pip install -r requirements.txt`
3. Start: `cd recetas && gunicorn config.wsgi`

[Ver guía completa de Render](DEPLOYMENT.md#render)

### Conectar Frontend con Backend

Una vez desplegado el backend, actualiza `app/config.js`:

```javascript
production: {
  baseURL: 'https://tu-api-backend.herokuapp.com/api',  // Tu URL aquí
  timeout: 15000
}
```

## 📡 Uso de la API

### Health Check

```bash
GET /api/health/
```

### Predecir Sustituto

```bash
POST /api/predict/
Content-Type: application/json

{
  "ingrediente": "Pancetta",
  "top_k": 3
}
```

**Respuesta:**
```json
{
  "ingrediente_original": "Pancetta",
  "sustitutos": [
    {
      "sustituto": "Bacon",
      "probabilidad": 95.5,
      "confianza": "Muy Alta"
    }
  ]
}
```

[Ver más ejemplos de API](recetas/API_EXAMPLES.md)

## 🧪 Testing

```bash
# Activar entorno virtual
cd recetas
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Tests de la API
python test_api.py

# Tests específicos
python test_manual_prediction.py
```

## 🛠️ Tecnologías

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- GitHub Pages para hosting
- GitHub Actions para CI/CD

### Backend
- Django 4.2 - Framework web
- Django REST Framework - API REST
- TensorFlow 2.15 - Deep Learning
- Transformers (Hugging Face) - BERT
- SQLite/PostgreSQL - Base de datos

### Machine Learning
- **BERT**: dccuchile/bert-base-spanish-wwm-uncased
- Fine-tuned para ingredientes en español
- ~85-90% de precisión en sustituciones

## 📚 Documentación

- 📖 [Guía de Despliegue](DEPLOYMENT.md) - Cómo desplegar en producción
- 🔧 [Guía de GitHub](GITHUB_SETUP.md) - Subir proyecto a GitHub
- 🎯 [Ejemplos de API](recetas/API_EXAMPLES.md) - Uso de endpoints
- 🏗️ [Arquitectura](recetas/ARQUITECTURA.md) - Diseño del sistema
- ⚡ [Quick Start](recetas/QUICKSTART.md) - Inicio rápido

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/NuevaCaracteristica`
3. Commit: `git commit -m 'Añadir nueva característica'`
4. Push: `git push origin feature/NuevaCaracteristica`
5. Abre un Pull Request

### Guidelines

- Código limpio y comentado
- Tests para nuevas funcionalidades
- Actualizar documentación si es necesario
- Seguir el estilo de código existente

## 🔒 Seguridad

⚠️ **Antes de desplegar en producción:**

- [ ] Cambiar `SECRET_KEY` de Django
- [ ] Establecer `DEBUG=False`
- [ ] Configurar `ALLOWED_HOSTS`
- [ ] Configurar CORS apropiadamente
- [ ] Usar HTTPS
- [ ] Variables sensibles en `.env` (no en el código)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Tu Nombre** - [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- [dccuchile](https://huggingface.co/dccuchile) - Modelo BERT en español
- Django & Django REST Framework
- Hugging Face Transformers
- TensorFlow Team
- GitHub Pages

## 📞 Soporte

¿Tienes preguntas o problemas?

- 🐛 [Abrir un Issue](https://github.com/TU-USUARIO/TU-REPO/issues)
- 💬 [Discusiones](https://github.com/TU-USUARIO/TU-REPO/discussions)
- 📧 Email: tu-email@ejemplo.com

## 🗺️ Roadmap

- [ ] Añadir más idiomas (inglés, portugués)
- [ ] Implementar caché de predicciones
- [ ] Mejorar UI/UX del frontend
- [ ] API GraphQL
- [ ] App móvil (React Native)
- [ ] Integración con bases de datos de recetas

## 📊 Estado del Proyecto

![Maintained](https://img.shields.io/badge/Maintained-yes-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/TU-USUARIO/TU-REPO)

---

⭐ Si este proyecto te fue útil, ¡dale una estrella en GitHub!

**Hecho con ❤️ y 🤖 IA**
