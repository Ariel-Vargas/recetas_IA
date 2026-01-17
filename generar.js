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

function cleanIngredientName(str){
  return (str || "")
    .replace(/^\s*[\d\/]+\s*/g, "")
    .replace(/^\s*\d+\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function replaceInText(text, original, sustituto){
  if (!text) return text;
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const o1 = original;
  const o2 = cleanIngredientName(original);

  let out = text;
  if (o1) out = out.replace(new RegExp(esc(o1), "gi"), sustituto);
  if (o2 && o2 !== o1) out = out.replace(new RegExp(esc(o2), "gi"), sustituto);
  return out;
}

function init(){
  const id = getParam("id");
  const pais = getParam("pais") || "";

  const receta = window.findRecetaById(id);

  const imgEl = document.getElementById("img");
  const pillPaisEl = document.getElementById("pillPais");
  const titleEl = document.getElementById("title");
  const countEl = document.getElementById("count");
  const ingsEl = document.getElementById("ings");
  const prepEl = document.getElementById("prep");

  if (!receta){
    titleEl.textContent = "Receta no encontrada";
    pillPaisEl.textContent = pais || "—";
    countEl.textContent = "0 artículos";
    ingsEl.innerHTML = "";
    prepEl.innerHTML = `<article class="step"><h3>Preparación</h3><p>No se encontró la receta.</p></article>`;
    return; 
  }

  titleEl.textContent = receta.nombre;
  pillPaisEl.textContent = receta.pais || pais || "País";
  imgEl.src = receta.img;
  imgEl.alt = receta.nombre;

  const appliedKey = `appliedSubs:${normalizeKey(id)}`;
  const appliedSubs = JSON.parse(sessionStorage.getItem(appliedKey) || "[]");

  const map = new Map(
    appliedSubs.map(s => [normalizeKey(s.original.nombre), s.sustituto])
  );

  const ingredientes = receta.ingredientes || [];
  countEl.textContent = `${ingredientes.length} artículos`;

  ingsEl.innerHTML = ingredientes.map(i => {
    const origName = i.item;
    const sub = map.get(normalizeKey(origName));

    const shownName = sub ? sub.nombre : origName;
    const shownNote = sub
      ? `Sustituto aplicado: ${sub.cantidad || ""}`.trim()
      : (i.nota || "");

    return `
      <li class="ing ${sub ? "is-sub" : ""}">
        <span class="dot" aria-hidden="true"></span>
        <div>
          <strong>${shownName}</strong>
          ${shownNote ? `<small>${shownNote}</small>` : ``}
        </div>
      </li>
    `;
  }).join("");

  let prep = receta.preparacion || [
    { titulo: "Preparación", texto: "Aquí irá el paso a paso generado por tu IA." }
  ];

  if (appliedSubs.length){
    prep = prep.map(step => {
      let texto = step.texto;
      for (const s of appliedSubs){
        texto = replaceInText(texto, s.original.nombre, s.sustituto.nombre);
      }
      return { ...step, texto };
    });
  }

  prepEl.innerHTML = prep.map(s => `
    <article class="step">
      <h3>${s.titulo}</h3>
      <p>${s.texto}</p>
    </article>
  `).join("");
}

init();
