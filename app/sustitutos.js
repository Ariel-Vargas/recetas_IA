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
const receta = findRecetaById(recetaId);

const recetaNombreEl = document.getElementById("recetaNombre");
const badgeEl = document.getElementById("cambiosBadge");
const listEl = document.getElementById("subsList");

const btnCancel = document.getElementById("btnCancel");
const btnAccept = document.getElementById("btnAccept");
let allSubs = (window.SUBSTITUCIONES_POR_RECETA?.[normalizeKey(recetaId)] || []);

const selectedKey = `selectedIngs:${normalizeKey(recetaId)}`;
const selected = JSON.parse(sessionStorage.getItem(selectedKey) || "[]");

const selectedSet = new Set(
  selected.map(x => normalizeKey(x.nombre))
);

let subs = allSubs.filter(s => selectedSet.has(normalizeKey(s.original.nombre)));

badgeEl.textContent = `${subs.length} cambios`;

function rowHTML(s, idx){
  return `
    <article class="row" data-idx="${idx}">
      <div class="side">
        <div class="thumb gray"></div>
        <div class="meta">
          <small>ORIGINAL</small>
          <strong>${s.original.nombre}</strong>
          <span>${s.original.cantidad || ""}</span>
        </div>
        <div></div>
      </div>

      <div class="mid" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M10 7h10M14 3l6 4-6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 17h10M8 13l-4 4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="side right">
        <div class="meta">
            <span class="chip">${s.sustituto.etiqueta || "SUGERIDO"}</span>
            <strong>${s.sustituto.nombre}</strong>
            <span>${s.sustituto.cantidad || ""}</span>
        </div>

        <div class="thumb yellow">
            <img src="${s.sustituto.img || "https://source.unsplash.com/200x200/?food"}" alt="${s.sustituto.nombre}">
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
  listEl.innerHTML = subs.map(rowHTML).join("");
  badgeEl.textContent = `${subs.length} cambios`;
}

render();

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