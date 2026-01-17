# 🍴 Sistema de Recetas con IA - Sustitución de Ingredientes

Sistema web desarrollado con Django que utiliza Transfer Learning con BERT para recomendar sustitutos ecuatorianos de ingredientes extranjeros en recetas internacionales.

## 📋 Características

- **🤖 Modelo BERT Multi-tarea**: Transfer learning con `bert-base-multilingual-cased` para predicción de sustitutos
- **🌎 Interfaz Web Moderna**: UI responsive y elegante para explorar recetas internacionales
- **🔄 Sustitución Inteligente**: Recomendaciones de ingredientes locales (Ecuador) para ingredientes extranjeros
- **📊 API REST**: Endpoints para integración con otras aplicaciones
- **⚡ Alta Performance**: Modelo precargado para respuestas rápidas

## 🛠️ Tecnologías

### Backend
- Django 4.2.8
- Django REST Framework
- TensorFlow 2.15
- Transformers (Hugging Face)
- BERT Multilingual

### Frontend
- HTML5/CSS3
- JavaScript (Vanilla)
- Diseño responsive

### Machine Learning
- Transfer Learning con BERT
- Tokenizer pre-entrenado
- Label Encoder personalizado

## 📦 Instalación

### Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- 4GB de RAM mínimo (para cargar el modelo BERT)

### Paso 1: Crear entorno virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Paso 2: Instalar dependencias

```bash
cd recetas
pip install -r requirements.txt
```

### Paso 3: Verificar estructura de archivos

Asegúrate de que la carpeta `modelo_exportado` esté en el nivel correcto:

```
IA/
├── app/
├── modelo_exportado/
│   ├── multi_task_model_weights.h5
│   ├── label_encoder.pkl
│   └── tokenizer/
│       ├── tokenizer.json
│       ├── vocab.txt
│       └── ...
└── recetas/
    ├── manage.py
    ├── config/
    ├── ingredientes/
    └── static/
```

### Paso 4: Inicializar base de datos

```bash
python manage.py migrate
```

### Paso 5: Crear superusuario (opcional)

```bash
python manage.py createsuperuser
```

### Paso 6: Ejecutar servidor

```bash
python manage.py runserver
```

El servidor estará disponible en: `http://localhost:8000`

## 🚀 Uso

### Interfaz Web

1. Accede a `http://localhost:8000`
2. Busca recetas por país
3. Selecciona una receta
4. Marca los ingredientes que deseas sustituir
5. Haz clic en "Cambiar Sustitutos"
6. Revisa las sugerencias del modelo BERT
7. Acepta los cambios y genera la receta final

### API REST

#### 1. Predecir sustituto para un ingrediente

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
      "sustituto": "Tocino ahumado",
      "probabilidad": 85.5,
      "confianza": "ALTA"
    },
    {
      "sustituto": "Bacon",
      "probabilidad": 78.2,
      "confianza": "ALTA"
    },
    {
      "sustituto": "Jamón ahumado",
      "probabilidad": 65.8,
      "confianza": "MEDIA"
    }
  ],
  "status": "success"
}
```

#### 2. Predecir sustitutos en lote

```bash
POST /api/predict-batch/
Content-Type: application/json

{
  "ingredientes": ["Pancetta", "Parmesano", "Mozzarella"]
}
```

#### 3. Obtener todos los sustitutos disponibles

```bash
GET /api/substitutes/
```

#### 4. Información del modelo

```bash
GET /api/model-info/
```

**Respuesta:**
```json
{
  "model_type": "BERT Multi-Task (Transfer Learning)",
  "base_model": "bert-base-multilingual-cased",
  "num_classes": 50,
  "max_sequence_length": 64,
  "available_substitutes": 50,
  "status": "loaded"
}
```

#### 5. Health Check

```bash
GET /api/health/
```

## 🧪 Testing con cURL

```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:8000/api/predict/" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"ingrediente":"Pancetta","top_k":3}'

# Linux/Mac/Git Bash
curl -X POST http://localhost:8000/api/predict/ \
  -H "Content-Type: application/json" \
  -d '{"ingrediente":"Pancetta","top_k":3}'
```

## 📁 Estructura del Proyecto

```
recetas/
├── manage.py                      # CLI de Django
├── requirements.txt               # Dependencias Python
├── README.md                      # Este archivo
│
├── config/                        # Configuración del proyecto
│   ├── __init__.py
│   ├── settings.py               # Configuración principal
│   ├── urls.py                   # URLs principales
│   ├── wsgi.py                   # WSGI para producción
│   └── asgi.py                   # ASGI para producción
│
├── ingredientes/                  # App principal
│   ├── __init__.py
│   ├── apps.py                   # Configuración de la app
│   ├── views.py                  # Vistas y API endpoints
│   ├── urls.py                   # URLs de la app
│   ├── models.py                 # Modelos (no usados)
│   ├── admin.py                  # Admin de Django
│   ├── tests.py                  # Tests
│   └── services/
│       ├── __init__.py
│       └── ml_service.py         # Servicio de ML con BERT
│
└── static/                        # Archivos estáticos (Frontend)
    ├── index.html
    ├── app.js
    ├── styles.css
    ├── recetas.html
    ├── recetas.js
    ├── recetas.css
    ├── detalle.html
    ├── detalle.js
    ├── detalle.css
    ├── sustitutos.html
    ├── sustitutos.js
    ├── sustitutos.css
    ├── generar.html
    ├── generar.js
    ├── generar.css
    └── data.js                    # Datos de recetas
```

## 🤖 Sobre el Modelo BERT

### Arquitectura

- **Modelo Base**: `bert-base-multilingual-cased`
- **Tipo**: Transfer Learning Multi-tarea
- **Idiomas**: Soporte multilingüe (incluye español)
- **Capas adicionales**:
  - Dense (256 unidades, ReLU)
  - Dropout (0.3)
  - Dense (128 unidades, ReLU)
  - Dropout (0.2)
  - Dense (N clases, Softmax)

### Funcionamiento

1. **Tokenización**: El ingrediente se tokeniza usando el tokenizer de BERT
2. **Embeddings**: Se generan embeddings contextuales con BERT
3. **Clasificación**: Las capas densas predicen el sustituto más apropiado
4. **Top-K**: Se retornan los K sustitutos con mayor probabilidad

### Niveles de Confianza

- **ALTA**: Probabilidad ≥ 80%
- **MEDIA**: Probabilidad ≥ 50%
- **BAJA**: Probabilidad < 50%

## ⚙️ Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Modificar Rutas del Modelo

Edita `config/settings.py`:

```python
MODEL_PATH = BASE_DIR.parent / 'modelo_exportado'
MODEL_WEIGHTS_PATH = MODEL_PATH / 'multi_task_model_weights.h5'
TOKENIZER_PATH = MODEL_PATH / 'tokenizer'
LABEL_ENCODER_PATH = MODEL_PATH / 'label_encoder.pkl'
```

## 🌐 Despliegue en Producción

### Preparación

1. **Configurar variables de entorno**:
```python
DEBUG = False
ALLOWED_HOSTS = ['tu-dominio.com']
SECRET_KEY = 'tu-clave-secreta-aleatoria'
```

2. **Recopilar archivos estáticos**:
```bash
python manage.py collectstatic
```

3. **Usar Gunicorn**:
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

4. **Configurar Nginx** (recomendado):
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location /static/ {
        alias /ruta/a/recetas/staticfiles/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🐛 Troubleshooting

### Error: "Modelo no cargado"

1. Verifica que la carpeta `modelo_exportado` esté en la ubicación correcta
2. Asegúrate de que todos los archivos del modelo estén presentes
3. Revisa los permisos de lectura de los archivos

### Error: "Out of Memory"

- El modelo BERT requiere ~2-3GB de RAM
- Considera usar una máquina con más memoria
- O modifica el código para cargar el modelo bajo demanda

### Error: TensorFlow no se instala

```bash
# Intenta con una versión específica de Python
pip install tensorflow==2.15.0 --upgrade

# O usa una versión CPU-only si no tienes GPU
pip install tensorflow-cpu==2.15.0
```

## 📝 Notas

- El modelo se carga automáticamente al iniciar el servidor
- La primera carga puede tardar 30-60 segundos
- Las predicciones subsecuentes son rápidas (~100ms)
- El modelo permanece en memoria durante toda la sesión

## 🤝 Contribuciones

Este proyecto fue creado como demostración del uso de Transfer Learning con BERT para problemas de clasificación de texto en el dominio culinario, específicamente para recomendar sustitutos de ingredientes ecuatorianos.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## ✨ Autor

Desarrollado con ❤️ como proyecto de demostración de IA aplicada

---

**¡Disfruta cocinando con IA! 🍳🤖**
