// DEBUG: Verificar que el archivo se carga
console.log("✓ data.js iniciando...");

// Función global para normalizar claves
window.normalizeKey = function(str){
  return (str || "")
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

console.log("✓ normalizeKey definida");

// Variable global para que sea accesible desde otros scripts
window.RECETAS_POR_PAIS = {
    francia: [
      {
        id: "quiche-lorraine",
        pais: "Francia",
        nombre: "Quiche Lorraine",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://insidermama.com/wp-content/uploads/2025/04/3-quiche-1024x574.webp",
        ingredientes: [
          { item: "Pâte brisée", nota: "" },
          { item: "Lardons", nota: "" },
          { item: "Œufs", nota: "" },
          { item: "Crème fraîche", nota: "" },
          { item: "Fromage râpé", nota: "" },
          { item: "Oignon", nota: "Opcional" },
          { item: "Sel", nota: "" },
          { item: "Poivre", nota: "" },
          { item: "Noix de muscade", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Precalentar", texto: "Precalienta el horno a 180 ℃." },
          { titulo: "Dorar", texto: "Dora los lardons (tocineta). Sofríe el oignon (cebolla) si lo usas." },
          { titulo: "Mezclar", texto: "Bate œufs con crème fraîche; agrega sel, poivre y un toque de noix de muscade." },
          { titulo: "Base", texto: "Coloca la pâte brisée en el molde y pincha con tenedor." },
          { titulo: "Rellenar", texto: "Añade lardons (y oignon), vierte la mezcla y cubre con fromage râpé." },
          { titulo: "Hornear", texto: "Hornea 30–40 min hasta dorar. Reposa 10 min." }
        ]
      },
      {
        id: "ratatouille",
        pais: "Francia",
        nombre: "Ratatouille",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://lebistroman.es/madrid/wp-content/uploads/sites/2/2019/06/Ratatouille.webp",
        ingredientes: [
          { item: "Courgette", nota: "" },
          { item: "Aubergine", nota: "" },
          { item: "Tomates", nota: "2–3" },
          { item: "Poivron", nota: "" },
          { item: "Oignon", nota: "" },
          { item: "Ail", nota: "" },
          { item: "Huile d'olive", nota: "" },
          { item: "Sel", nota: "" },
          { item: "Poivre", nota: "" },
          { item: "Herbes de Provence / thym / romarin", nota: "" }
        ],
        preparacion: [
          { titulo: "Cortar", texto: "Corta todo en cubos." },
          { titulo: "Sofrito", texto: "Sofríe oignon y ail con huile d'olive." },
          { titulo: "Cocción 1", texto: "Agrega poivron y aubergine; cocina 8–10 min." },
          { titulo: "Cocción 2", texto: "Añade courgette y tomates, salpimenta y agrega hierbas." },
          { titulo: "Terminar", texto: "Cocina tapado a fuego medio-bajo 20–30 min." },
          { titulo: "Servir", texto: "Sirve como acompañante o con arroz/pan." }
        ]
      },
      {
        id: "crepes",
        pais: "Francia",
        nombre: "Crêpes",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.cia-france.es/media/3028/immersion-culturelle-gastronomie-francaise_992x694.webp",
        ingredientes: [
          { item: "Farine de blé", nota: "" },
          { item: "Œufs", nota: "" },
          { item: "Lait", nota: "" },
          { item: "Beurre fondu", nota: "" },
          { item: "Sel", nota: "" },
          { item: "Sucre", nota: "Opcional" },
          { item: "Extrait de vanille", nota: "Opcional" },
          { item: "Garniture au choix", nota: "Jamón+queso / confiture / dulce de lait / banano / mermelada" }
        ],
        preparacion: [
          { titulo: "Mezclar", texto: "Mezcla farine, sel, œufs y lait hasta que quede líquido; agrega beurre fondu." },
          { titulo: "Reposar", texto: "Reposa 10 min." },
          { titulo: "Cocinar", texto: "En sartén antiadherente, cocina capas finas 1 min por lado." },
          { titulo: "Rellenar", texto: "Rellena y sirve." }
        ]
      },
      {
        id: "soupe-oignon",
        pais: "Francia",
        nombre: "Soupe à l’oignon",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.santamariaworld.com/optimized/recipe-large/globalassets/netherlands/recepten/75.-franse-uiensoep-met-knoflook-tijm-en-laurier.jpg",
        ingredientes: [
          { item: "Oignons", nota: "" },
          { item: "Beurre", nota: "" },
          { item: "Bouillon de bœuf ou de volaille", nota: "" },
          { item: "Farine", nota: "Opcional" },
          { item: "Pain (baguette)", nota: "" },
          { item: "Fromage (pour gratiner)", nota: "" },
          { item: "Sel", nota: "" },
          { item: "Poivre", nota: "" }
        ],
        preparacion: [
          { titulo: "Caramelizar", texto: "Corta oignons en plumas y carameliza con beurre a fuego bajo 20–30 min." },
          { titulo: "Opcional", texto: "Añade farine y cocina 1 min." },
          { titulo: "Hervir", texto: "Agrega bouillon y cocina 15 min." },
          { titulo: "Gratinar", texto: "Sirve con pain tostado encima y fromage; gratina." }
        ]
      },
      {
        id: "poulet-moutarde",
        pais: "Francia",
        nombre: "Poulet à la moutarde",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://media-cdn2.greatbritishchefs.com/media/5swpedzy/img85681.whqc_640x462q90.webp",
        ingredientes: [
          { item: "Poulet", nota: "" },
          { item: "Moutarde", nota: "" },
          { item: "Crème fraîche (ou crème liquide)", nota: "" },
          { item: "Huile", nota: "" },
          { item: "Sel", nota: "" },
          { item: "Poivre", nota: "" },
          { item: "Vin blanc (optionnel) / jus de citron", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Dorar", texto: "Dora el poulet con huile, sel y poivre. Retira." },
          { titulo: "Sofrito", texto: "Sofríe oignon/ail." },
          { titulo: "Salsa", texto: "Vuelve el poulet, agrega moutarde y luego crème fraîche." },
          { titulo: "Cocinar", texto: "Cocina 12–20 min hasta espesar y que el pollo esté bien cocido." }
        ]
      }
    ],
  
    italia: [
      {
        id: "pasta-al-pesto",
        pais: "Italia",
        nombre: "Pasta al pesto",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://superpilopi.com/wp-content/uploads/2021/01/pasta-italiana-al-pesto.jpg",
        ingredientes: [
          { item: "Pasta (spaghetti/penne)", nota: "" },
          { item: "Basilico", nota: "" },
          { item: "Aglio", nota: "" },
          { item: "Parmigiano Reggiano", nota: "" },
          { item: "Olio d’oliva", nota: "" },
          { item: "Sale", nota: "" },
          { item: "Pepe", nota: "" },
          { item: "Pinoli", nota: "Opzionale" }
        ],
        preparacion: [
          { titulo: "Cocinar", texto: "Cocina la pasta en agua con sal." },
          { titulo: "Salsa", texto: "Licúa o maja basilico, aglio, parmigiano, (pinoli/maní/nueces) y olio d'oliva." },
          { titulo: "Mezclar", texto: "Mezcla la salsa con la pasta caliente (puedes añadir un poco del agua de cocción)." }
        ]
      },
      {
        id: "spaghetti-carbonara",
        pais: "Italia",
        nombre: "Spaghetti alla carbonara",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.insidetherustickitchen.com/wp-content/uploads/2020/03/Spaghetti-alla-Carbonara-1200px-Inside-the-Rustic-Kitchen-1-1025x1536.jpg",
        ingredientes: [
          { item: "Spaghetti", nota: "" },
          { item: "Uova", nota: "" },
          { item: "Pancetta o guanciale", nota: "" },
          { item: "Pecorino Romano (o Parmigiano)", nota: "" },
          { item: "Pepe nero", nota: "" },
          { item: "Sale", nota: "" }
        ],
        preparacion: [
          { titulo: "Pasta", texto: "Cocina los spaghetti." },
          { titulo: "Dorar", texto: "Dora la pancetta/tocineta." },
          { titulo: "Mezcla huevo-queso", texto: "Bate uova con pecorino/parmesano y bastante pepe nero." },
          { titulo: "Emulsionar", texto: "Apaga el fuego, mezcla pasta + pancetta y luego añade la mezcla de huevo, moviendo rápido (sin que se corte)." }
        ]
      },
      {
        id: "lasagne-bolognese",
        pais: "Italia",
        nombre: "Lasagne alla bolognese",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.recipesfromitaly.com/wp-content/uploads/2021/02/lasagna-bolognese-recipe-600x900-1.jpg",
        ingredientes: [
          { item: "Sfoglie di lasagna", nota: "" },
          { item: "Carne macinata", nota: "" },
          { item: "Passata di pomodoro / salsa di pomodoro", nota: "" },
          { item: "Cipolla", nota: "" },
          { item: "Aglio", nota: "" },
          { item: "Carota", nota: "Opzionale" },
          { item: "Sedano", nota: "Opzionale" },
          { item: "Olio d'oliva", nota: "" },
          { item: "Sale", nota: "" },
          { item: "Pepe", nota: "" },
          { item: "Mozzarella", nota: "" },
          { item: "Parmigiano", nota: "" },
          { item: "Besciamella", nota: "" },
          { item: "Latte", nota: "" },
          { item: "Burro", nota: "" },
          { item: "Farina", nota: "" },
          { item: "Noce moscata", nota: "Opzionale" }
        ],
        preparacion: [
          { titulo: "Ragù", texto: "Sofríe cipolla/aglio (y carota/sedano), añade carne macinata, luego passata; cocina 20–30 min." },
          { titulo: "Besciamella", texto: "Derrite burro, agrega farina y luego latte poco a poco hasta espesar." },
          { titulo: "Armar capas", texto: "Arma capas: salsa, pasta, ragù, besciamella, mozzarella y parmigiano." },
          { titulo: "Hornear", texto: "Hornea 35–45 min a 180 ℃. Reposa 10 min." }
        ]
      },
      {
        id: "risotto-funghi",
        pais: "Italia",
        nombre: "Risotto ai funghi",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.cooking-vacations.com/wp-content/uploads/2023/06/50-1024x1024.jpeg",
        ingredientes: [
          { item: "Riso Arborio/Carnaroli", nota: "" },
          { item: "Funghi (champignon)", nota: "" },
          { item: "Brodo di pollo/verdure", nota: "" },
          { item: "Cipolla", nota: "" },
          { item: "Burro", nota: "" },
          { item: "Parmigiano", nota: "" },
          { item: "Olio d'oliva", nota: "" },
          { item: "Sale", nota: "" },
          { item: "Pepe", nota: "" },
          { item: "Vino bianco", nota: "Opzionale" }
        ],
        preparacion: [
          { titulo: "Base", texto: "Sofríe cipolla con burro/olio." },
          { titulo: "Hongos", texto: "Añade funghi y dora." },
          { titulo: "Arroz", texto: "Agrega el arroz y mezcla 1–2 min." },
          { titulo: "Opcional", texto: "Añade vino bianco." },
          { titulo: "Cremosidad", texto: "Ve agregando brodo caliente poco a poco, moviendo, hasta que quede cremoso." },
          { titulo: "Final", texto: "Apaga, añade burro y parmigiano." }
        ]
      },
      {
        id: "pollo-parmigiana",
        pais: "Italia",
        nombre: "Pollo alla parmigiana",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://media-assets.lacucinaitaliana.it/photos/672cec699ce6ca9c747a6c6b/1:1/w_960,c_limit/Chicken%20parmesan%20copia.jpg",
        ingredientes: [
          { item: "Petto di pollo", nota: "" },
          { item: "Pangrattato", nota: "" },
          { item: "Uova", nota: "" },
          { item: "Farina", nota: "" },
          { item: "Salsa di pomodoro", nota: "" },
          { item: "Mozzarella", nota: "" },
          { item: "Parmigiano", nota: "" },
          { item: "Olio", nota: "" },
          { item: "Sale", nota: "" },
          { item: "Pepe", nota: "" },
          { item: "Origano", nota: "Opzionale" }
        ],
        preparacion: [
          { titulo: "Preparar", texto: "Aplana el pollo, salpimienta." },
          { titulo: "Empanizar", texto: "Pasa por farina, luego uova batido y pangrattato." },
          { titulo: "Dorar", texto: "Dora en sartén con aceite." },
          { titulo: "Gratinar", texto: "Coloca en bandeja: salsa di pomodoro + mozzarella + parmigiano." },
          { titulo: "Hornear", texto: "Hornea 10–15 min hasta gratinar." }
        ]
      }
    ],
  
    peru: [
      {
        id: "aji-de-gallina",
        pais: "Perú",
        nombre: "Ají de gallina",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://cdn0.recetasgratis.net/es/posts/4/3/0/aji_de_gallina_peruano_78034_600.webp",
        ingredientes: [
          { item: "Pechuga de gallina o pollo", nota: "" },
          { item: "Ají amarillo (pasta)", nota: "" },
          { item: "Pan de molde o galletas de soda", nota: "" },
          { item: "Leche evaporada", nota: "" },
          { item: "Queso fresco", nota: "" },
          { item: "Cebolla", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Nueces", nota: "Opcional" },
          { item: "Caldo de pollo", nota: "" },
          { item: "Aceite", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" },
          { item: "Para servir", nota: "Arroz blanco, huevo duro, aceitunas" }
        ],
        preparacion: [
          { titulo: "Cocinar pollo", texto: "Cocina el pollo en agua con sal; desmenúzalo y reserva caldo." },
          { titulo: "Licuar", texto: "Remoja pan/galletas con leche evaporada y licúa." },
          { titulo: "Sofreír", texto: "Sofríe cebolla y ajo, agrega pasta de ají amarillo y cocina 2–3 min." },
          { titulo: "Espesar", texto: "Incorpora la mezcla licuada, caldo y queso; mueve hasta que espese." },
          { titulo: "Terminar", texto: "Añade el pollo, ajusta sal/pimienta. Sirve con arroz, huevo y aceitunas." }
        ]
      },
      {
        id: "lomo-saltado",
        pais: "Perú",
        nombre: "Lomo saltado",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://es.cravingsjournal.com/wp-content/uploads/2021/08/lomo-saltado-1-1024x1536.jpg",
        ingredientes: [
          { item: "Lomo de res", nota: "" },
          { item: "Cebolla roja", nota: "" },
          { item: "Tomate", nota: "" },
          { item: "Ají amarillo", nota: "Opcional" },
          { item: "Sillao", nota: "" },
          { item: "Vinagre", nota: "" },
          { item: "Papas fritas", nota: "" },
          { item: "Arroz blanco", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Culantro", nota: "Opcional" },
          { item: "Aceite", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" }
        ],
        preparacion: [
          { titulo: "Acompañamientos", texto: "Fríe papas y reserva. Cocina arroz aparte." },
          { titulo: "Sellar carne", texto: "Saltea la carne a fuego fuerte con aceite; que se dore rápido." },
          { titulo: "Saltear verduras", texto: "Agrega ajo, cebolla y luego tomate (corto para que no se deshaga)." },
          { titulo: "Sazonar", texto: "Añade sillao y un chorrito de vinagre; mezcla." },
          { titulo: "Final", texto: "Incorpora papas al final y sirve con arroz." }
        ]
      },
      {
        id: "causa-limena",
        pais: "Perú",
        nombre: "Causa limeña",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://blog.renaware.com/wp-content/uploads/2024/04/Causa-Limena-02-800x530.jpg",
        ingredientes: [
          { item: "Papa amarilla", nota: "" },
          { item: "Ají amarillo", nota: "" },
          { item: "Limón", nota: "" },
          { item: "Aceite", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Relleno", nota: "Atún o pollo" },
          { item: "Mayonesa", nota: "" },
          { item: "Palta", nota: "" },
          { item: "Cebolla", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Puré", texto: "Cocina las papas y haz puré." },
          { titulo: "Sazonar", texto: "Mezcla puré con pasta de ají amarillo, limón, aceite y sal." },
          { titulo: "Relleno", texto: "Mezcla atún o pollo con mayonesa (y cebolla si quieres)." },
          { titulo: "Armar", texto: "Arma capas: papa - relleno - palta - papa." },
          { titulo: "Enfriar", texto: "Enfría 20–30 min y sirve." }
        ]
      },
      {
        id: "arroz-chaufa",
        pais: "Perú",
        nombre: "Arroz chaufa",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.laylita.com/recetas/wp-content/uploads/2022/12/Arroz-chaufa-peruano-receta-1024x683.jpg",
        ingredientes: [
          { item: "Arroz cocido", nota: "" },
          { item: "Pollo o carne", nota: "" },
          { item: "Huevo", nota: "" },
          { item: "Cebolla china", nota: "" },
          { item: "Sillao", nota: "" },
          { item: "Kión", nota: "Opcional" },
          { item: "Aceite", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" },
          { item: "Aceite de ajonjolí", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Saltear", texto: "Saltea pollo/carne en wok o sartén caliente." },
          { titulo: "Aromatizar", texto: "Agrega kión rallado (opcional) y luego el arroz." },
          { titulo: "Sillao", texto: "Añade sillao y mezcla bien." },
          { titulo: "Huevo", texto: "Haz un espacio, cocina el huevo revuelto y mezcla." },
          { titulo: "Final", texto: "Termina con cebolla china picada." }
        ]
      },
      {
        id: "tallarines-verdes",
        pais: "Perú",
        nombre: "Tallarines verdes",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://origin.cronosmedia.glr.pe/large/2024/05/02/lg_6633bb8bed7fed5a801a8bb0.jpg",
        ingredientes: [
          { item: "Tallarines", nota: "" },
          { item: "Albahaca", nota: "" },
          { item: "Espinaca", nota: "Opcional" },
          { item: "Queso fresco o parmesano", nota: "" },
          { item: "Leche evaporada o leche", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Aceite", nota: "" },
          { item: "Nueces / maní", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" }
        ],
        preparacion: [
          { titulo: "Pasta", texto: "Cocina los tallarines." },
          { titulo: "Salsa", texto: "Licúa albahaca (y espinaca), ajo, queso, leche y (maní/nueces) hasta salsa verde." },
          { titulo: "Calentar", texto: "Calienta la salsa 3–5 min, ajusta sal/pimienta." },
          { titulo: "Mezclar", texto: "Mezcla con la pasta y sirve." }
        ]
      }
    ],
  
    colombia: [
      {
        id: "arepas",
        pais: "Colombia",
        nombre: "Arepas",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://i.blogs.es/b01029/arepas-de-queso-colombianas/1024_2000.jpg",
        ingredientes: [
          { item: "Harina de maíz precocida", nota: "" },
          { item: "Agua tibia", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Queso", nota: "" },
          { item: "Mantequilla", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Masa", texto: "Mezcla harina, sal y agua hasta formar masa suave. Reposa 5 min." },
          { titulo: "Formar", texto: "Forma discos." },
          { titulo: "Cocinar", texto: "Cocina en sartén 4–6 min por lado hasta dorar." },
          { titulo: "Opcional", texto: "Termina 5 min tapada para que cocine por dentro." },
          { titulo: "Servir", texto: "Abre y rellena con queso o sirve con mantequilla." }
        ]
      },
      {
        id: "bandeja-paisa",
        pais: "Colombia",
        nombre: "Bandeja paisa",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://i.blogs.es/bb0cca/bandeja_paisa/1024_2000.jpg",
        ingredientes: [
          { item: "Fríjoles rojos (cargamanto)", nota: "" },
          { item: "Arroz blanco", nota: "" },
          { item: "Carne molida", nota: "" },
          { item: "Chicharrón o tocineta", nota: "" },
          { item: "Chorizo", nota: "" },
          { item: "Huevo frito", nota: "" },
          { item: "Plátano maduro", nota: "" },
          { item: "Aguacate", nota: "" },
          { item: "Arepa", nota: "Opcional" },
          { item: "Hogao", nota: "Cebolla + tomate" },
          { item: "Ajo", nota: "" },
          { item: "Comino", nota: "Opcional" },
          { item: "Sal", nota: "" }
        ],
        preparacion: [
          { titulo: "Fríjoles", texto: "Cocina los fríjoles hasta ablandar; haz hogao y agrégalo." },
          { titulo: "Arroz", texto: "Cocina el arroz." },
          { titulo: "Carne", texto: "Cocina la carne con ajo/cebolla, sal y comino." },
          { titulo: "Frituras", texto: "Fríe plátano, huevo y chicharrón (y chorizo si usas)." },
          { titulo: "Servir", texto: "Sirve todo junto con aguacate y arepa." }
        ]
      },
      {
        id: "sancocho",
        pais: "Colombia",
        nombre: "Sancocho",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://imag.bonviveur.com/sancocho-colombiano_1000.webp",
        ingredientes: [
          { item: "Pollo o res", nota: "" },
          { item: "Yuca", nota: "" },
          { item: "Papa", nota: "" },
          { item: "Plátano verde", nota: "" },
          { item: "Mazorca", nota: "" },
          { item: "Cebolla", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Cilantro", nota: "" },
          { item: "Comino", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" }
        ],
        preparacion: [
          { titulo: "Base", texto: "Hierve agua con pollo/res, sal y ajo." },
          { titulo: "Agregar", texto: "Agrega yuca, papa, plátano verde y mazorca." },
          { titulo: "Cocinar", texto: "Cocina hasta que todo esté tierno." },
          { titulo: "Final", texto: "Añade cebolla y cilantro al final. Sirve caliente con limón si quieres." }
        ]
      },
      {
        id: "ajiaco",
        pais: "Colombia",
        nombre: "Ajiaco",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_mobile/public/srh_recipes/3964b77d9ff84585e562ad1bd1205e25.webp?itok=-xqmfK4F",
        ingredientes: [
          { item: "Pollo (presas o pechuga)", nota: "" },
          { item: "Papas", nota: "Mezcla si puedes" },
          { item: "Mazorca", nota: "" },
          { item: "Cebolla larga", nota: "" },
          { item: "Cilantro", nota: "" },
          { item: "Caldo de pollo", nota: "" },
          { item: "Crema de leche", nota: "" },
          { item: "Alcaparras", nota: "Opcional" },
          { item: "Aguacate", nota: "Opcional, para servir" },
          { item: "Guascas", nota: "Tradicional, opcional" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" }
        ],
        preparacion: [
          { titulo: "Cocinar pollo", texto: "Cocina el pollo en caldo con cebolla larga. Retira y desmecha." },
          { titulo: "Espesar", texto: "Agrega papas y mazorca; cocina hasta que una parte se deshaga y espese." },
          { titulo: "Volver pollo", texto: "Vuelve a poner el pollo. Ajusta sal/pimienta." },
          { titulo: "Servir", texto: "Sirve con crema de leche y alcaparras si tienes, y aguacate aparte." }
        ]
      },
      {
        id: "empanadas-colombianas",
        pais: "Colombia",
        nombre: "Empanadas colombianas",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://recetasdecocina.elmundo.es/wp-content/uploads/2025/05/empanadas-colombianas.jpg",
        ingredientes: [
          { item: "Harina de maíz precocida", nota: "" },
          { item: "Papa", nota: "" },
          { item: "Carne molida o pollo", nota: "" },
          { item: "Cebolla", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Comino / color", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" },
          { item: "Aceite para freír", nota: "" }
        ],
        preparacion: [
          { titulo: "Relleno", texto: "Cocina papa y aplástala. Cocina carne con cebolla, ajo, sal y comino. Mezcla con papa." },
          { titulo: "Masa", texto: "Haz masa con harina + agua + sal." },
          { titulo: "Formar", texto: "Forma discos, rellena y cierra." },
          { titulo: "Freír", texto: "Fríe en aceite caliente hasta dorar." }
        ]
      }
    ],
  
    espana: [
      {
        id: "tortilla-patatas",
        pais: "España",
        nombre: "Tortilla de patatas",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://jetextramar.com/wp-content/uploads/2022/02/141930697_presentation.jpg",
        ingredientes: [
          { item: "Patatas", nota: "" },
          { item: "Huevos", nota: "" },
          { item: "Cebolla", nota: "Opcional" },
          { item: "Aceite de oliva", nota: "" },
          { item: "Sal", nota: "" }
        ],
        preparacion: [
          { titulo: "Cortar", texto: "Pela y corta las papas en láminas." },
          { titulo: "Freír", texto: "Fríelas a fuego medio en bastante aceite hasta que estén suaves (no crujientes)." },
          { titulo: "Opcional", texto: "Sofríe la cebolla." },
          { titulo: "Mezclar", texto: "Bate huevos con sal y mezcla con papas (y cebolla)." },
          { titulo: "Cuajar", texto: "Cuaja en sartén por ambos lados, cuidando que no se queme." }
        ]
      },
      {
        id: "paella-mixta",
        pais: "España",
        nombre: "Paella mixta",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://cocina-casera.com/wp-content/uploads/2015/11/paella-mixta-receta-casera.jpeg",
        ingredientes: [
          { item: "Arroz", nota: "" },
          { item: "Pollo", nota: "" },
          { item: "Marisco", nota: "Camarones/mejillones" },
          { item: "Pimiento rojo", nota: "" },
          { item: "Cebolla", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Caldo de pollo (o agua)", nota: "" },
          { item: "Guisantes", nota: "Opcional" },
          { item: "Aceite de oliva", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" },
          { item: "Pimentón dulce", nota: "" },
          { item: "Azafrán", nota: "Opcional" },
          { item: "Limón", nota: "Opcional, para servir" }
        ],
        preparacion: [
          { titulo: "Sofrito", texto: "Sofríe pollo y retira. Sofríe cebolla, ajo y pimiento." },
          { titulo: "Arroz", texto: "Añade arroz, pimentón y mezcla 1 min." },
          { titulo: "Caldo", texto: "Agrega caldo caliente (aprox. 2–2.5 tazas por 1 taza de arroz)." },
          { titulo: "Mariscos", texto: "Cocina sin mover mucho. A mitad, agrega mariscos y arvejas." },
          { titulo: "Reposar", texto: "Deja que se seque y repose 5–10 min. Sirve con limón." }
        ]
      },
      {
        id: "gazpacho",
        pais: "España",
        nombre: "Gazpacho",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://img2.rtve.es/n/2094520?w=1600",
        ingredientes: [
          { item: "Tomates maduros", nota: "" },
          { item: "Pepino", nota: "" },
          { item: "Pimiento verde", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Pan (del día anterior)", nota: "" },
          { item: "Aceite de oliva", nota: "" },
          { item: "Vinagre", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Agua fría", nota: "" }
        ],
        preparacion: [
          { titulo: "Remojar", texto: "Remoja el pan con un poco de agua." },
          { titulo: "Licuar", texto: "Licúa tomate, pepino, pimiento, ajo, pan, aceite, vinagre y sal." },
          { titulo: "Ajustar", texto: "Ajusta con agua fría hasta la textura deseada." },
          { titulo: "Enfriar", texto: "Enfría 1–2 horas y sirve." }
        ]
      },
      {
        id: "croquetas-jamon",
        pais: "España",
        nombre: "Croquetas de jamón",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://content-cocina.lecturas.com/medio/2024/04/17/croquetas-de-jamon-serrano_c5aece5e_240417090411_1200x1200.jpg",
        ingredientes: [
          { item: "Jamón serrano o jamón cocido", nota: "" },
          { item: "Leche", nota: "" },
          { item: "Mantequilla", nota: "" },
          { item: "Harina de trigo", nota: "" },
          { item: "Cebolla", nota: "Opcional" },
          { item: "Nuez moscada", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" },
          { item: "Huevo", nota: "Para empanizar" },
          { item: "Pan rallado", nota: "Para empanizar" },
          { item: "Aceite", nota: "Para freír" }
        ],
        preparacion: [
          { titulo: "Base", texto: "Sofríe cebolla (opcional) con mantequilla. Agrega harina y cocina 1 min." },
          { titulo: "Bechamel", texto: "Añade leche poco a poco, moviendo hasta bechamel espesa." },
          { titulo: "Sazonar", texto: "Agrega jamón picado, nuez moscada, sal/pimienta. Enfría (ideal 2 horas)." },
          { titulo: "Formar", texto: "Forma croquetas, pasa por huevo y pan rallado." },
          { titulo: "Freír", texto: "Fríe hasta dorar." }
        ]
      },
      {
        id: "patatas-bravas",
        pais: "España",
        nombre: "Patatas bravas",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://cdn-ilddihb.nitrocdn.com/MgqZCGPEMHvMRLsisMUCAIMWvgGMxqaj/assets/images/optimized/rev-b56f8d8/www.goya.com/wp-content/uploads/2023/10/spicy-potatoes-900x900.jpg",
        ingredientes: [
          { item: "Patatas", nota: "" },
          { item: "Aceite", nota: "" },
          { item: "Salsa de tomate", nota: "" },
          { item: "Pimentón picante o ají", nota: "Opcional" },
          { item: "Ajo", nota: "Opcional" },
          { item: "Vinagre", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Mayonesa o alioli", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Freír", texto: "Corta las papas en cubos y fríe hasta dorar. Sala." },
          { titulo: "Salsa", texto: "Calienta salsa de tomate con pimentón/ají, ajo y un chorrito de vinagre." },
          { titulo: "Servir", texto: "Sirve las papas con salsa encima y, si quieres, mayonesa/alioli." }
        ]
      }
    ],
  
    ecuador: [
      {
        id: "encebollado",
        pais: "Ecuador",
        nombre: "Encebollado",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://i0.wp.com/recetaskwa.com/wp-content/uploads/2025/01/Encebollado_2025_5.jpg?resize=1024%2C683&ssl=1",
        ingredientes: [
          { item: "Albacora o atún", nota: "Fresco o en lata" },
          { item: "Yuca", nota: "" },
          { item: "Cebolla colorada", nota: "" },
          { item: "Tomate", nota: "" },
          { item: "Pimiento", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Cilantro", nota: "" },
          { item: "Comino", nota: "" },
          { item: "Ají", nota: "Opcional" },
          { item: "Limón", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Agua", nota: "" }
        ],
        preparacion: [
          { titulo: "Yuca", texto: "Cocina la yuca en agua con sal hasta que esté suave. Reserva." },
          { titulo: "Cocinar pescado", texto: "Cocina el pescado con tomate, pimiento, ajo, comino y sal (puedes hacerlo en la misma olla)." },
          { titulo: "Unir", texto: "Desmenuza el pescado y regresa al caldo. Agrega la yuca." },
          { titulo: "Curtido", texto: "Cebolla paiteña en pluma con limón y sal (y cilantro si quieres)." },
          { titulo: "Servir", texto: "Sirve el encebollado y pon el curtido encima; acompaña con ají." }
        ]
      },
      {
        id: "seco-de-pollo",
        pais: "Ecuador",
        nombre: "Seco de pollo",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.laylita.com/recetas/wp-content/uploads/2008/02/Seco-de-gallina-o-pollo-receta-1024x768.jpg",
        ingredientes: [
          { item: "Pollo (presas)", nota: "" },
          { item: "Cebolla colorada", nota: "" },
          { item: "Tomate", nota: "" },
          { item: "Pimiento", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Cilantro", nota: "" },
          { item: "Comino", nota: "" },
          { item: "Cerveza", nota: "Opcional, típico" },
          { item: "Aceite", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimienta", nota: "" },
          { item: "Para servir", nota: "Arroz + plátano maduro" }
        ],
        preparacion: [
          { titulo: "Licuar", texto: "Licúa o procesa cilantro con un poco de agua (para darle el color)." },
          { titulo: "Refrito", texto: "Sofríe cebolla, ajo, tomate y pimiento. Añade comino, sal y pimienta." },
          { titulo: "Dorar pollo", texto: "Agrega el pollo y dóralo." },
          { titulo: "Cocinar", texto: "Añade la mezcla de cilantro y un chorrito de cerveza; cocina tapado 25–35 min hasta que espese." },
          { titulo: "Servir", texto: "Sirve con arroz y plátano maduro." }
        ]
      },
      {
        id: "menestra-frejol-arroz",
        pais: "Ecuador",
        nombre: "Menestra de fréjol con arroz",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://sabor.eluniverso.com/wp-content/uploads/2023/10/CARNE-ASADA-CON-ARROZ-Y-MENESTRA-1024x878.jpg",
        ingredientes: [
          { item: "Frejol (rojo o canario)", nota: "" },
          { item: "Cebolla", nota: "" },
          { item: "Ajo", nota: "" },
          { item: "Pimiento", nota: "" },
          { item: "Comino", nota: "" },
          { item: "Cilantro", nota: "Opcional" },
          { item: "Aceite", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Para servir", nota: "Arroz + plátano maduro" },
          { item: "Carne asada o pollo", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Cocinar frejol", texto: "Remoja el frejol (si es seco) y cocínalo hasta ablandar." },
          { titulo: "Refrito", texto: "Haz refrito con cebolla, ajo, pimiento, comino y aceite." },
          { titulo: "Espesar", texto: "Agrega el refrito al frejol con un poco de su caldo y cocina 10–15 min hasta espesar." },
          { titulo: "Servir", texto: "Sirve con arroz y plátano maduro (y carne si quieres)." }
        ]
      },
      {
        id: "bolon-de-verde",
        pais: "Ecuador",
        nombre: "Bolón de verde",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.cocina-ecuatoriana.com/base/stock/Recipe/bolon-de-verde-mixto/bolon-de-verde-mixto_web.jpg.webp",
        ingredientes: [
          { item: "Plátano verde", nota: "" },
          { item: "Queso", nota: "Opcional" },
          { item: "Chicharrón", nota: "Opcional" },
          { item: "Mantequilla o manteca", nota: "" },
          { item: "Sal", nota: "" }
        ],
        preparacion: [
          { titulo: "Cocinar", texto: "Cocina el plátano verde (hervido o frito) hasta que esté suave." },
          { titulo: "Majar", texto: "Májalos caliente con mantequilla/manteca y sal." },
          { titulo: "Mezclar", texto: "Agrega queso o chicharrón y mezcla." },
          { titulo: "Formar", texto: "Forma bolas y dora ligeramente en sartén si quieres." }
        ]
      },
      {
        id: "ceviche-camaron",
        pais: "Ecuador",
        nombre: "Ceviche de camarón",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://i0.wp.com/recetaskwa.com/wp-content/uploads/2023/09/ceviche_camaron.jpg?ssl=1",
        ingredientes: [
          { item: "Camarón cocido", nota: "" },
          { item: "Cebolla paiteña", nota: "" },
          { item: "Tomate", nota: "" },
          { item: "Cilantro", nota: "" },
          { item: "Limón", nota: "" },
          { item: "Naranja", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Salsa de tomate", nota: "Opcional" },
          { item: "Mostaza", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Enfriar", texto: "Cocina el camarón y enfríalo." },
          { titulo: "Curtido", texto: "Haz un curtido rápido con cebolla paiteña, limón y sal (enjuaga si lo prefieres menos fuerte)." },
          { titulo: "Mezclar", texto: "Mezcla camarón con tomate picado, cilantro y el curtido." },
          { titulo: "Ajustar jugo", texto: "Ajusta el 'jugo' con limón (y un toque de naranja)." },
          { titulo: "Opcional", texto: "Añade un poco de salsa de tomate y mostaza. Sirve frío." }
        ]
      }
    ],
  
    brasil: [
      {
        id: "feijoada",
        pais: "Brasil",
        nombre: "Feijoada",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://gourmet.expob2b.es/uploads/fotos_noticias/2016/07/w800px_13508-109339.jpg",
        ingredientes: [
          { item: "Feijão preto", nota: "" },
          { item: "Carne seca / carne de porco / linguiça", nota: "Según consigas" },
          { item: "Cebola", nota: "" },
          { item: "Alho", nota: "" },
          { item: "Folha de louro", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Pimenta", nota: "" },
          { item: "Óleo", nota: "" },
          { item: "Para servir", nota: "Arroz branco + Farofa + Laranja" }
        ],
        preparacion: [
          { titulo: "Cocinar frijol", texto: "Remoja el feijão preto (si es seco) y cocínalo hasta ablandar." },
          { titulo: "Dorar carnes", texto: "Aparte, dora las carnes (tocino/chorizo/cerdo) con cebola y alho." },
          { titulo: "Unir", texto: "Mezcla carnes con el frejol, añade laurel y cocina a fuego bajo 30–40 min para que espese." },
          { titulo: "Servir", texto: "Sirve con arroz, farofa y gajos de naranja." }
        ]
      },
      {
        id: "moqueca",
        pais: "Brasil",
        nombre: "Moqueca",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Moqueca.jpg",
        ingredientes: [
          { item: "Peixe (corvina/tilápia/robalo)", nota: "" },
          { item: "Leite de coco", nota: "" },
          { item: "Tomate", nota: "" },
          { item: "Cebola", nota: "" },
          { item: "Pimentão", nota: "" },
          { item: "Alho", nota: "" },
          { item: "Coentro", nota: "" },
          { item: "Limão", nota: "" },
          { item: "Sal", nota: "" },
          { item: "Pimenta", nota: "" },
          { item: "Azeite", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Sazonar", texto: "Sazona el pescado con sal, pimienta y limón." },
          { titulo: "Capas", texto: "En una olla, coloca capas de cebolla, tomate y pimiento; encima el pescado." },
          { titulo: "Cocinar", texto: "Agrega leche de coco y cocina tapado 15–20 min a fuego medio-bajo (sin revolver fuerte)." },
          { titulo: "Final", texto: "Termina con cilantro. Sirve con arroz." }
        ]
      },
      {
        id: "pao-de-queijo",
        pais: "Brasil",
        nombre: "Pão de queijo",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://sabordelobueno.com/wp-content/uploads/2018/05/Pa%CC%83o-de-queijo-pan-queso-brasil-1024x683.jpg",
        ingredientes: [
          { item: "Polvilho doce (ou azedo)", nota: "" },
          { item: "Queijo minas (ou parmesão)", nota: "" },
          { item: "Ovos", nota: "" },
          { item: "Leite", nota: "" },
          { item: "Óleo o manteiga", nota: "" },
          { item: "Sal", nota: "" }
        ],
        preparacion: [
          { titulo: "Calentar", texto: "Calienta leche con aceite y sal (sin hervir fuerte)." },
          { titulo: "Mezclar", texto: "En un bowl, agrega el líquido caliente al almidón de yuca y mezcla." },
          { titulo: "Amasar", texto: "Cuando entibie, añade huevos y queso; amasa hasta masa pegajosa pero manejable." },
          { titulo: "Hornear", texto: "Forma bolitas y hornea a 180–200 ℃ por 15–20 min hasta inflar y dorar." }
        ]
      },
      {
        id: "brigadeiro",
        pais: "Brasil",
        nombre: "Brigadeiro",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://www.laylita.com/recetas/wp-content/uploads/2018/07/Brigadeiros.jpg",
        ingredientes: [
          { item: "Leite condensado", nota: "" },
          { item: "Chocolate em pó / cacau", nota: "" },
          { item: "Manteiga", nota: "" },
          { item: "Granulado", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Cocinar", texto: "En olla a fuego bajo, mezcla leche condensada + cacao + mantequilla." },
          { titulo: "Espesar", texto: "Revuelve hasta que espese y se despegue del fondo." },
          { titulo: "Formar", texto: "Enfría, forma bolitas y pásalas por granulado." }
        ]
      },
      {
        id: "farofa",
        pais: "Brasil",
        nombre: "Farofa",
        tiempo: null,
        dificultad: null,
        rating: null,
        img: "https://i.blogs.es/dc90b1/farofa_brasilena/1024_2000.jpeg",
        ingredientes: [
          { item: "Farinha de mandioca", nota: "" },
          { item: "Manteiga (ou óleo)", nota: "" },
          { item: "Cebola", nota: "" },
          { item: "Alho", nota: "Opcional" },
          { item: "Sal", nota: "" },
          { item: "Bacon", nota: "Opcional" },
          { item: "Ovo", nota: "Opcional" }
        ],
        preparacion: [
          { titulo: "Sofrito", texto: "Sofríe cebolla (y ajo) en mantequilla/aceite." },
          { titulo: "Tostar", texto: "Agrega harina de yuca y tuesta 5–8 min moviendo hasta dorar." },
          { titulo: "Ajustar", texto: "Ajusta sal." },
          { titulo: "Opcional", texto: "Añade tocineta dorada o huevo revuelto." }
        ]
      }
    ]
  };
  

console.log("✓ RECETAS_POR_PAIS definido:", Object.keys(window.RECETAS_POR_PAIS));

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

window.findRecetaById = function(id){
  const target = window.normalizeKey(id);
  for (const key in window.RECETAS_POR_PAIS){
    const arr = window.RECETAS_POR_PAIS[key] || [];
    const found = arr.find(r => window.normalizeKey(r.id) === target);
    if (found) return found;
  }
  return null;
}
