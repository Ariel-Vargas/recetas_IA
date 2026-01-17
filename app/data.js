function normalizeKey(str){
  return (str || "")
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const RECETAS_POR_PAIS = {
  italia: [
    {
      id: "pasta-carbonara",
      pais: "Italia",
      nombre: "Pasta Carbonara",
      tiempo: 30,
      dificultad: "Fácil",
      rating: 4.8,
      img: "https://www.simplyrecipes.com/thmb/0UeN5LhKq-ze3BcZJ7_Yp803T24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Pasta-Carbonara-LEAD-1-c477cc25c7294cd9a3fc51ece176481f.jpg",
      ingredientes: [
        { item: "200g Pasta (spaghetti)", nota: "Preferiblemente spaghetti" },
        { item: "100g Pancetta o bacon", nota: "En cubos" },
        { item: "2 Huevos", nota: "1 entero + 1 yema (opcional)" },
        { item: "50g Queso parmesano", nota: "Rallado" },
        { item: "Pimienta negra", nota: "Recién molida" },
        { item: "Sal", nota: "Al gusto" },
      ],
      preparacion: [
        {titulo: "Hervir la pasta", texto: "Hierve agua con sal y cocina la pasta hasta que esté al dente. Reserva 1/2 taza del agua de cocción antes de escurrir."},
        {titulo: "Dorar la pancetta", texto: "En una sartén a fuego medio, dora la pancetta o bacon hasta que esté crujiente. Apaga el fuego y reserva."},
        {titulo: "Preparar la mezcla de huevo y queso", texto: "En un bowl mezcla los huevos con el queso parmesano y bastante pimienta negra. Debe quedar una crema espesa."},
        {titulo: "Emulsionar la salsa (sin cortar el huevo)", texto: "Con la sartén fuera del fuego, agrega la pasta caliente a la pancetta y mezcla. Añade la mezcla de huevo y queso poco a poco, moviendo rápido. Si hace falta, incorpora un poco del agua de cocción para lograr una salsa cremosa."},
        {titulo: "Servir", texto: "Sirve de inmediato. Termina con más queso parmesano y pimienta negra al gusto."},
],
    },
    {
      id: "pizza-napolitana",
      pais: "Italia",
      nombre: "Pizza Napolitana",
      tiempo: 45,
      dificultad: "Media",
      rating: 4.9,
      img: "https://easyways.cl/storage/20210208143331pizza-napolitana.jpg",
      ingredientes: [
        { item: "250g Harina", nota: "Para masa" },
        { item: "160ml Agua", nota: "Tibia" },
        { item: "5g Levadura", nota: "Seca" },
        { item: "Salsa de tomate", nota: "Natural" },
        { item: "Mozzarella", nota: "Fresca" },
        { item: "Albahaca", nota: "Hojas" },
      ],
    },
    {
      id: "risotto-hongos",
      pais: "Italia",
      nombre: "Risotto de Hongos",
      tiempo: 40,
      dificultad: "Media",
      rating: 4.7,
      img: "https://imag.bonviveur.com/risotto-de-hongos-casero.jpg",
      ingredientes: [
        { item: "200g Arroz arborio", nota: "" },
        { item: "Hongos", nota: "Mixtos" },
        { item: "Caldo", nota: "Vegetal o pollo" },
        { item: "Mantequilla", nota: "" },
        { item: "Parmesano", nota: "Rallado" },
        { item: "Cebolla", nota: "Picada fina" },
      ],
    },
    {
      id: "lasana-bolonesa",
      pais: "Italia",
      nombre: "Lasaña Boloñesa",
      tiempo: 60,
      dificultad: "Difícil",
      rating: 4.8,
      img: "https://i.pinimg.com/736x/18/76/7e/18767e2208f85638186154816d971526.jpg",
      ingredientes: [
        { item: "Láminas de lasaña", nota: "" },
        { item: "Carne molida", nota: "Res" },
        { item: "Salsa de tomate", nota: "" },
        { item: "Bechamel", nota: "" },
        { item: "Queso", nota: "Mozzarella/parmesano" },
        { item: "Cebolla y ajo", nota: "" },
      ],
    },
    {
      id: "tiramisu",
      pais: "Italia",
      nombre: "Tiramisú",
      tiempo: 20,
      dificultad: "Fácil",
      rating: 4.9,
      img: "https://cdn.blog.paulinacocina.net/wp-content/uploads/2020/01/receta-de-tiramisu-facil-y-economico-1740483918.jpg",
      ingredientes: [
        { item: "Queso mascarpone", nota: "" },
        { item: "Bizcochos de soletilla", nota: "" },
        { item: "Café", nota: "Fuerte" },
        { item: "Cacao", nota: "Para espolvorear" },
        { item: "Azúcar", nota: "" },
        { item: "Huevos", nota: "" },
      ],
    },
    {
      id: "focaccia",
      pais: "Italia",
      nombre: "Focaccia",
      tiempo: 120,
      dificultad: "Media",
      rating: 4.6,
      img: "https://www.expogourmetmagazine.com/uploads/fotos_noticias/2019/04/w1200px_19478-156951-recetas-del-mundo-italia-foccacia.jpg",
      ingredientes: [
        { item: "300g Harina", nota: "" },
        { item: "200ml Agua", nota: "" },
        { item: "Levadura", nota: "" },
        { item: "Aceite de oliva", nota: "Extra virgen" },
        { item: "Romero", nota: "" },
        { item: "Sal gruesa", nota: "" },
      ],
    },
  ],

  mexico: [
    {
      id: "tacos-al-pastor",
      pais: "México",
      nombre: "Tacos al Pastor",
      tiempo: 35,
      dificultad: "Media",
      rating: 4.8,
      img: "https://laabuelacarmen.com/wp-content/uploads/2025/05/receta-tacos-al-pastor-salsa-chile-chipotle.jpg",
      ingredientes: [
        { item: "500g Carne de cerdo", nota: "Preferiblemente cabeza de lomo" },
        { item: "3 Chiles guajillo", nota: "Secos, sin semillas" },
        { item: "1/2 Piña natural", nota: "" },
        { item: "10 Tortillas de maíz", nota: "Pequeñas “taqueras”" },
        { item: "Pasta de achiote", nota: "50 gramos" },
        { item: "Cilantro y Cebolla", nota: "Picados finamente" },
        { item: "Limón", nota: "Al gusto" },
        { item: "Sal", nota: "Al gusto" },
      ],
    },
  ],
};

window.SUBSTITUCIONES_POR_RECETA = window.SUBSTITUCIONES_POR_RECETA || {

  "pasta-carbonara": [
    {
      original: { nombre: "100g Pancetta o bacon", cantidad: "100g" },
      sustituto: { nombre: "Tocino ahumado", cantidad: "100g", etiqueta: "ACCESIBLE", img: "https://www.winkulgourmet.cl/wp-content/uploads/42952009_ml-e1511811091634.jpg" }
    },
    {
      original: { nombre: "50g Queso parmesano", cantidad: "50g" },
      sustituto: { nombre: "Queso pecorino", cantidad: "50g", etiqueta: "UMAMI", img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Pecorino_di_Filiano.jpg" }
    }
  ],

  "pizza-napolitana": [
    {
      original: { nombre: "Mozzarella", cantidad: "al gusto" },
      sustituto: { nombre: "Queso mozzarella rallado", cantidad: "al gusto", etiqueta: "COMÚN", img: "https://a.storyblok.com/f/160385/9b00225133/shredded-mozzarella-and-block.jpeg" }
    },
    {
      original: { nombre: "Albahaca", cantidad: "Hojas" },
      sustituto: { nombre: "Orégano seco", cantidad: "1 cdita", etiqueta: "ACCESIBLE", img: "https://image.tuasaude.com/media/article/zg/be/para-que-sirve-la-albahaca_57823.jpg?width=686&height=487" }
    }
  ]
};

function findRecetaById(id){
  const target = normalizeKey(id);
  for (const key in RECETAS_POR_PAIS){
    const arr = RECETAS_POR_PAIS[key] || [];
    const found = arr.find(r => normalizeKey(r.id) === target);
    if (found) return found;
  }
  return null;
}