const form = document.getElementById("searchForm");
const input = document.getElementById("countryInput");
const hint  = document.getElementById("hint");

function normalizeCountry(str){
  return str.trim().replace(/\s+/g, " ");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const country = normalizeCountry(input.value);

  if (!country){
    hint.textContent = "Escribe un país para buscar recetas.";
    input.focus();
    return;
  }

  window.location.href = `recetas.html?pais=${encodeURIComponent(country)}`;
});
