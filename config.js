/**
 * Configuración de la API para diferentes entornos
 * 
 * Este archivo permite que el frontend se conecte a diferentes backends
 * dependiendo del entorno (desarrollo local o producción en GitHub Pages)
 */

const API_CONFIG = {
  // Desarrollo local - API corriendo en tu máquina
  development: {
    baseURL: 'http://localhost:8000/api',
    timeout: 10000
  },
  
  // Producción - API desplegada en servidor externo
  production: {
    // IMPORTANTE: Cambia esta URL por la de tu API desplegada
    // Ejemplos:
    // - Heroku: 'https://tu-app.herokuapp.com/api'
    // - Railway: 'https://tu-app.railway.app/api'
    // - Render: 'https://tu-app.onrender.com/api'
    baseURL: 'https://TU-API-BACKEND.herokuapp.com/api',
    timeout: 15000
  }
};

/**
 * Detectar el entorno actual
 * - localhost o 127.0.0.1 = development
 * - github.io u otros = production
 */
function detectEnvironment() {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  
  return 'production';
}

// Entorno actual
const ENV = detectEnvironment();

// Configuración activa
const activeConfig = API_CONFIG[ENV];

// URL base de la API (exportar para usar en otros archivos)
const API_BASE_URL = activeConfig.baseURL;
const API_TIMEOUT = activeConfig.timeout;

/**
 * Función helper para hacer requests a la API
 * Incluye manejo de errores y timeout
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Configuración por defecto
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: API_TIMEOUT
  };
  
  // Merge con opciones personalizadas
  const fetchOptions = { ...defaultOptions, ...options };
  
  // Si hay body, convertirlo a JSON
  if (fetchOptions.body && typeof fetchOptions.body !== 'string') {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }
  
  try {
    console.log(`[API] ${fetchOptions.method} ${url}`);
    
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`[API] ✓ Success`, data);
    
    return { success: true, data };
    
  } catch (error) {
    console.error(`[API] ✗ Error:`, error);
    return { 
      success: false, 
      error: error.message,
      // En caso de error, devolver datos de respaldo si es necesario
      fallback: true
    };
  }
}

/**
 * API Methods - Funciones específicas para cada endpoint
 */
const API = {
  // Health check
  async checkHealth() {
    return await apiRequest('/health/');
  },
  
  // Información del modelo
  async getModelInfo() {
    return await apiRequest('/model-info/');
  },
  
  // Predecir sustitutos para un ingrediente
  async predictSubstitute(ingrediente, topK = 3) {
    return await apiRequest('/predict/', {
      method: 'POST',
      body: { ingrediente, top_k: topK }
    });
  },
  
  // Predecir múltiples ingredientes
  async predictBatch(ingredientes) {
    return await apiRequest('/predict-batch/', {
      method: 'POST',
      body: { ingredientes }
    });
  },
  
  // Obtener lista de sustitutos disponibles
  async getSubstitutes() {
    return await apiRequest('/substitutes/');
  }
};

// Log de configuración al cargar
console.log(`[Config] Environment: ${ENV}`);
console.log(`[Config] API Base URL: ${API_BASE_URL}`);

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API, API_BASE_URL, ENV };
}
