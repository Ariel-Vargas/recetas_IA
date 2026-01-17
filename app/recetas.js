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

const titleEl = document.getElementById("title");
const gridEl = document.getElementById("grid");
const hintEl = document.getElementById("hint");
const moreBtn = document.getElementById("moreBtn");

const paisRaw = getParam("pais") || "Italia";
const paisKey = normalizeKey(paisRaw);

titleEl.textContent = `Recetas de ${paisRaw}`;

let recetas = (RECETAS_POR_PAIS[paisKey] || []);
let visibleCount = 6;

function cardHTML(item){
  return `
    <article class="card" data-id="${item.id}">
      <div class="media">
        <img src="${item.img}" alt="${item.nombre}">
        <button class="fav" type="button" aria-label="Guardar receta">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21s-7-4.6-9.3-8.6C.9 9 .9 6.3 3 4.5 5.1 2.7 8.2 3.2 10 5c.7.7 1.2 1.4 2 2 .8-.6 1.3-1.3 2-2 1.8-1.8 4.9-2.3 7 .5 2.1 1.8 2.1 4.5.3 7.9C19 16.4 12 21 12 21Z"
              stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="content">
        <h3 class="title">${item.nombre}</h3>

        <div class="meta">
          <div class="left">
            <span>⏱ ${item.tiempo} min</span>
            <span class="dot" aria-hidden="true"></span>
            <span>${item.dificultad}</span>
          </div>

          <span class="pill" title="Rating">
            <span class="star" aria-hidden="true"></span>
            ${Number(item.rating).toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  `;
}


function render(){
  gridEl.innerHTML = "";

  if (recetas.length === 0){
    hintEl.textContent = `Todavía no hay recetas para “${paisRaw}”.`;
    moreBtn.style.display = "none";
    return;
  }

  hintEl.textContent = "";
  const slice = recetas.slice(0, visibleCount);
  gridEl.innerHTML = slice.map(cardHTML).join("");

  moreBtn.style.display = visibleCount < recetas.length ? "inline-flex" : "none";
}

render();

moreBtn.addEventListener("click", () => {
  visibleCount = Math.min(visibleCount + 6, recetas.length);
  render();
});

gridEl.addEventListener("click", (e) => {
  const favBtn = e.target.closest(".fav");
  if (favBtn){
    favBtn.classList.toggle("is-on");
    return;
  }

  const card = e.target.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  window.location.href = `detalle.html?id=${encodeURIComponent(id)}&pais=${encodeURIComponent(paisRaw)}`;
});