function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
function normalizeKey(str){
  return (str || "")
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const recetaId = getParam("id");
const receta = window.findRecetaById(recetaId);

const recetaNombreEl = document.getElementById("recetaNombre");
const badgeEl = document.getElementById("cambiosBadge");
const listEl = document.getElementById("subsList");

const btnCancel = document.getElementById("btnCancel");
const btnAccept = document.getElementById("btnAccept");

const selectedKey = `selectedIngs:${normalizeKey(recetaId)}`;
const selected = JSON.parse(sessionStorage.getItem(selectedKey) || "[]");

let subs = [];
let loading = true;

// Mostrar receta
if (receta) {
  recetaNombreEl.textContent = receta.nombre;
}

// Obtener predicciones del modelo BERT
async function getPredictionsFromModel() {
  // Extraer los nombres de ingredientes seleccionados
  const ingredientes = selected.map(s => s.nombre);
  
  if (ingredientes.length === 0) {
    console.log("No hay ingredientes seleccionados");
    loading = false;
    render();
    return;
  }
  
  console.log("Analizando ingredientes con inteligencia artificial:", ingredientes);
  listEl.innerHTML = `
    <div style="text-align:center; padding:40px 20px;">
      <p style="font-size:18px; font-weight:600; color:#333;">Analizando ingredientes...</p>
      <p style="font-size:14px; color:#666; margin-top:10px;">Nuestro sistema está buscando las mejores alternativas locales para ${ingredientes.length} ingrediente${ingredientes.length > 1 ? 's' : ''}</p>
      <div style="margin-top:20px;">
        <div style="display:inline-block; width:40px; height:40px; border:4px solid #f4d000; border-top-color:transparent; border-radius:50%; animation:spin 1s linear infinite;"></div>
      </div>
    </div>
    <style>
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
  `;
  
  try {
    // Primero verificar que el modelo esté cargado
    const healthCheck = await fetch('/api/health/');
    const healthData = await healthCheck.json();
    
    if (!healthData.model_loaded) {
      throw new Error('El sistema de inteligencia artificial no está disponible. Por favor, intenta más tarde o contacta con soporte.');
    }
    
    console.log("Sistema de recomendaciones disponible");
    
    // Llamar a la API de predicción en batch
    const response = await fetch('/api/predict-batch/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientes: ingredientes
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Respuesta del modelo:", data);
    
    // Convertir las predicciones a formato de sustituciones
    subs = [];
    data.resultados.forEach((resultado, index) => {
      if (resultado.status === 'success' && resultado.sustitutos.length > 0) {
        // Tomar el sustituto con mayor probabilidad
        const mejorSustituto = resultado.sustitutos[0];
        
        // Usar el nombre original de 'selected' para preservar mayúsculas/minúsculas
        const nombreOriginal = selected[index]?.nombre || resultado.ingrediente_original;
        
        console.log(`Ingrediente ${index + 1}: "${nombreOriginal}" -> "${mejorSustituto.sustituto}"`);
        
        subs.push({
          original: {
            nombre: nombreOriginal,
            cantidad: selected[index]?.cantidad || ""
          },
          sustituto: {
            nombre: mejorSustituto.sustituto,
            cantidad: selected[index]?.cantidad || "",
            etiqueta: mejorSustituto.confianza,
            probabilidad: mejorSustituto.probabilidad,
            img: "https://source.unsplash.com/200x200/?food," + encodeURIComponent(mejorSustituto.sustituto)
          }
        });
      }
    });
    
    loading = false;
    badgeEl.textContent = `${subs.length} sustitución${subs.length !== 1 ? 'es' : ''}`;
    render();
    
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    listEl.innerHTML = `
      <div style="text-align:center; padding:40px 20px;">
        <p style="font-size:16px; font-weight:600; color:#d32f2f;">No pudimos procesar tu solicitud</p>
        <p style="font-size:13px; color:#666; margin-top:10px; line-height:1.6;">${error.message}</p>
        <button onclick="location.reload()" style="margin-top:20px; padding:12px 24px; border-radius:8px; border:none; background:#f4d000; color:#000; font-weight:700; cursor:pointer; font-size:13px;">
          Intentar nuevamente
        </button>
      </div>
    `;
    loading = false;
  }
}

// Iniciar la obtención de predicciones
getPredictionsFromModel();

function rowHTML(s, idx){
  // Mejorar el texto de confianza
  let confianzaTexto = '';
  let confianzaColor = '';
  
  if (s.sustituto.etiqueta === 'ALTA') {
    confianzaTexto = 'Muy recomendado';
    confianzaColor = 'background: rgba(76, 175, 80, 0.15); color: #2e7d32; border-color: rgba(76, 175, 80, 0.3);';
  } else if (s.sustituto.etiqueta === 'MEDIA') {
    confianzaTexto = 'Recomendado';
    confianzaColor = 'background: rgba(255, 193, 7, 0.15); color: #f57c00; border-color: rgba(255, 193, 7, 0.3);';
  } else {
    confianzaTexto = 'Alternativa posible';
    confianzaColor = 'background: rgba(0, 0, 0, 0.05); color: #666; border-color: rgba(0, 0, 0, 0.1);';
  }
  
  const probabilidadInfo = s.sustituto.probabilidad 
    ? ` (${s.sustituto.probabilidad}% de compatibilidad)` 
    : '';
  
  return `
    <article class="row" data-idx="${idx}" style="grid-template-columns: 1fr 56px 1fr 28px;">
      <div class="side">
        <div class="meta" style="grid-column: 1 / -1; padding-left: 0;">
          <small>INGREDIENTE ORIGINAL</small>
          <strong>${s.original.nombre}</strong>
          <span>${s.original.cantidad || ""}</span>
        </div>
      </div>

      <div class="mid" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M10 7h10M14 3l6 4-6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 17h10M8 13l-4 4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="side right">
        <div class="meta" style="grid-column: 1 / -1;">
            <span class="chip" style="${confianzaColor}">${confianzaTexto}</span>
            <strong style="font-size: 15px;">${s.sustituto.nombre}</strong>
            <span style="color: #888; font-size: 12px;">${s.sustituto.cantidad || ""}${probabilidadInfo}</span>
        </div>
      </div>

      <button class="remove" type="button" aria-label="Quitar cambio">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
    </article>
  `;
}

function render(){
  if (loading) {
    return; // No renderizar mientras carga
  }
  
  if (subs.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:40px 20px;">
        <p style="font-size:16px; font-weight:600; color:#555;">No encontramos alternativas disponibles</p>
        <p style="font-size:13px; color:#777; margin-top:10px; line-height:1.6;">Los ingredientes seleccionados no tienen sustitutos recomendados en este momento. <br/>Intenta con otros ingredientes o prueba más tarde.</p>
      </div>
    `;
  } else {
    listEl.innerHTML = subs.map(rowHTML).join("");
  }
  
  badgeEl.textContent = `${subs.length} sustitución${subs.length !== 1 ? 'es' : ''}`;
}

// No llamar render() aquí porque se llama después de cargar las predicciones

listEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".remove");
  if (!btn) return;

  const row = e.target.closest(".row");
  if (!row) return;

  const idx = Number(row.dataset.idx);
  subs.splice(idx, 1);
  render();
});

btnCancel.addEventListener("click", () => {
  history.back();
});

btnAccept.addEventListener("click", () => {
  const appliedKey = `appliedSubs:${normalizeKey(recetaId)}`;
  sessionStorage.setItem(appliedKey, JSON.stringify(subs));

  window.location.href = `detalle.html?id=${encodeURIComponent(recetaId)}`;
});
