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

const id = getParam("id");
const paisParam = getParam("pais") || "";

const receta = window.findRecetaById(id);

const imgEl = document.getElementById("img");
const tagPaisEl = document.getElementById("tagPais");
const titleEl = document.getElementById("title");
const bcPais = document.getElementById("bcPais");
const bcReceta = document.getElementById("bcReceta");
const countEl = document.getElementById("count");
const listEl = document.getElementById("list");

const btnSubs = document.getElementById("btnSubs");
const btnGen  = document.getElementById("btnGen");

const appliedKey = `appliedSubs:${normalizeKey(id)}`;
const appliedSubs = JSON.parse(sessionStorage.getItem(appliedKey) || "[]");

const appliedMap = new Map(
  appliedSubs.map(s => [normalizeKey(s.original.nombre), s.sustituto])
);

let selected = new Set();

if (!receta){
  titleEl.textContent = "Receta no encontrada";
  bcPais.textContent = paisParam || "—";
  bcReceta.textContent = "—";
  tagPaisEl.textContent = paisParam || "—";
  imgEl.alt = "Sin imagen";
  imgEl.src = "img/placeholder.jpg";
  countEl.textContent = "0 artículos";
} else {
  titleEl.textContent = receta.nombre;
  bcPais.textContent = receta.pais || paisParam || "País";
  bcReceta.textContent = receta.nombre;
  tagPaisEl.textContent = receta.pais || paisParam || "País";

  imgEl.src = receta.img;
  imgEl.alt = receta.nombre;

  const ings = receta.ingredientes || [];
  countEl.textContent = `${ings.length} artículos`;

  listEl.innerHTML = ings.map((i, idx) => {
    const key = normalizeKey(i.item);
    const sub = appliedMap.get(key);

    const displayName = sub ? sub.nombre : i.item;
    const displayNote = sub ? `Sustituto aplicado: ${sub.cantidad || ""}`.trim() : (i.nota || "");

    return `
      <li class="item" data-idx="${idx}">
        <span class="check" aria-hidden="true"></span>
        <div>
          <strong>${displayName}</strong>
          ${displayNote ? `<small>${displayNote}</small>` : ``}
        </div>
      </li>
    `;
  }).join("");
}

listEl.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) return;

  const idx = Number(li.dataset.idx);
  const check = li.querySelector(".check");

  if (selected.has(idx)){
    selected.delete(idx);
    li.classList.remove("is-selected");
    check.classList.remove("is-on");
  } else {
    selected.add(idx);
    li.classList.add("is-selected");
    check.classList.add("is-on");
  }
});

btnSubs.addEventListener("click", () => {
  if (!receta) return;

  const ings = receta.ingredientes || [];
  const selectedArr = Array.from(selected).sort((a,b)=>a-b);

  if (selectedArr.length === 0){
    alert("Por favor, selecciona al menos un ingrediente para encontrar alternativas locales.");
    return;
  }

  sessionStorage.setItem(
    `selectedIngs:${normalizeKey(id)}`,
    JSON.stringify(selectedArr.map(idx => ({
      idx,
      nombre: ings[idx]?.item || "",
      cantidad: "" 
    })))
  );

  window.location.href = `sustitutos.html?id=${encodeURIComponent(id)}&pais=${encodeURIComponent(paisParam)}`;
});

btnGen.addEventListener("click", () => {
  if (!id) return;
  window.location.href = `generar.html?id=${encodeURIComponent(id)}&pais=${encodeURIComponent(paisParam)}`;
});
