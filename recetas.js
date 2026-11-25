// Mantiene el catálogo por separado y añade datos editoriales opcionales.
// La duración se expresa únicamente con una de estas categorías:
// "<30 minutos", "entre 30 - 60 minutos", ">1 hora", ">1 día".
window.RECETAS = [
  {
    name: "Pumpkin curry",
    description: "Receta aprendida en una cocina perdida de Sri Lanka",
    tipo: "Salado",
    region: "India",
    tiempoMinutos: "30 - 60 minutos",
    etiquetas: ["Tupper", "Comida en casa"],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/pumpkin_curry.png",
    ingredients: [
      "Calabaza",
      "Cebolla",
      "Ajo",
      "Tomate concentrado",
      "Tomate triturado",
      "1 manzana reineta",
      "Salsa de soja",
      "Leche de coco o nata en su defecto",
      "Especias: curry, comino, cúrcuma, canela, curry leaves"
    ],
    instructions: [
      "Sofreír la cebolla y ajo, echar el tomate concentrado, tomate triturado y las especias.",
      "Echar la calabaza y cubrir con agua. Cocinar a medio fuego unos 20 minutos.",
      "Al finalizar, echar la manzana rallada y la leche de coco o nata y cocinar 3 minutos."
    ],
    tips: [
      "Para que no se pase la calabaza mucho y espese la salsa, deja la tapa entreabierta.",
      "Los trozos muy grandes de calabaza córtalos a la mitad."
    ],
    fuente: "Sigiriya (Sri Lanka)",
    fecha: "11/05/2025"
  },
  {
    name: "Cachapa de Reina pipiada",
    description: "En recuerdo a El Cachapas del Merecumbé",
    tipo: "Salado",
    region: "Sudamérica",
    tiempoMinutos: "<30 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Carne"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/cachapa_reina_pipiada.png",
    ingredients: [
      "Pollo",
      "Aguacate",
      "Mayonesa",
      "Cebolla morada",
      "Cilantro",
      "Lima",
      "Maíz crudo",
      "Azúcar",
      "Mantequilla",
      "Sal",
      "Pimienta",
      "Laurel"
    ],
    instructions: [
      "Hervir agua con sal, pimienta y laurel.",
      "En cuanto rompa a hervir, sumergir el pollo y apagar el fuego.",
      "Deshilachar el pollo frío y mezclarlo con aguacate, mayonesa, cebolla morada, cilantro, lima, sal y pimienta.",
      "Para la cachapa, triturar maíz crudo, azúcar y sal y cocinar con mantequilla la masa."
    ],
    tips: ["Cocinar la cachapa tapada para que se cuaje"],
    fuente: "Merecumbé (Las Tablas)",
    fecha: "02/12/2025"
  },
  {
    name: "Chocolate, pan, aceite y sal 🍫🥖🧂",
    description: "Postre de cumple de Angel para Angel",
    tipo: "Postre",
    region: "Mediterránea",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/chocolate_pan_aceite_sal.png",
    ingredients: [
      "1 naranja - opcional",
      "200 g de nata para montar",
      "200 g de chocolate negro",
      "30 g de mantequilla",
      "Pan",
      "Aceite de oliva virgen extra",
      "Sal marina en escamas"
    ],
    instructions: [
      "Infusiona la nata con la piel de la naranja.",
      "Cuela la nata sobre el chocolate en pedazos para derretirlo y mezclarlo.",
      "Emúlsionalo con la mantequilla en dados y sal.",
      "Reparte la ganache en una fuente para que se enfríe en la nevera tras golpearla para quitar burbujas.",
      "Sirve con aceite, pan tostado y sal."
    ],
    tips: ["Para servir calienta una cuchara (agua, soplete)"],
    fuente: "https://paulasapron.com/pan-con-chocolate-aceite-y-sal/",
    fecha: "22/08/2025"
  },
  {
    name: "Hojaldre, mermelada y brie",
    description: "-",
    tipo: "Aperitivo",
    region: "Mediterránea",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/hojaldre_mermelada_brie.png",
    ingredients: ["Pendiente"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "-",
    fecha: "21/12/2025"
  },
  {
    name: "Tartar de fuet",
    description: "-",
    tipo: "Aperitivo",
    region: "Mediterránea",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Carne"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/tartar_fuet.png",
    ingredients: [
      "1 fuet",
      "Piparras",
      "Cebolleta",
      "Pepinillos",
      "Mostaza antigua"
    ],
    instructions: ["Picar y mezclar todo"],
    tips: ["-"],
    fuente: "-",
    fecha: "17/08/2025"
  },
  {
    name: "Pancakes de plátano 🥞",
    description: "-",
    tipo: "Merienda",
    region: "Mediterránea",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/pancakes_platano.png",
    ingredients: ["Pendiente"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "-",
    fecha: "08/08/2025"
  },
  {
    name: "Acai🍓🫐🍌",
    description: "-",
    tipo: "Merienda",
    region: "Sudamérica",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/asai.png",
    ingredients: ["Pendiente"],
    instructions: ["Pendiente"],
    tips: ["Para la próxima, congelar el plátano"],
    fuente: "-",
    fecha: "23/07/2025"
  },
  {
    name: "Tarta de limón 🍋",
    description: "Fresquita para el verano",
    tipo: "Postre",
    region: "Mediterránea",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/tarta_limon.png",
    ingredients: [
      "800ml de nata (35% de grasa)",
      "80-100ml de leche condensada",
      "75ml de zumo de limón (unos 2 limones)",
      "Ralladura de 2 limones",
      "Una pizca de sal",
      "Gelatina (opcional)",
      "Galletas digestive",
      "Mantequilla"
    ],
    instructions: [
      "Enfriar una base de galleta triturada con mantequilla.",
      "Disolver todos los ingredientes en un cazo.",
      "Dejarlo enfriar sobre la base.",
      "Rallar limón por encima."
    ],
    tips: ["Enfriar con film en contacto con la superficie para que no se reseque"],
    fuente: "https://paulasapron.com/tarta-de-limon-sin-horno-y-cremosa/",
    fecha: "21/06/2025"
  },
  {
    name: "Okra Sri Lankesa 🫛",
    description: "",
    tipo: "Salado",
    region: "India",
    tiempoMinutos: "<30 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/okra.png",
    ingredients: [
      "Okra",
      "Cebolla, tomate…",
      "Cúrcuma, curry, canela…"
    ],
    instructions: [
      "Sofreír las verduras.",
      "Añadir la okra y saltear hasta que tenga buena textura.",
      "Especiar."
    ],
    tips: ["Cuidado con el moco de la okra"],
    fuente: "Sri Lanka",
    fecha: "16/05/2025"
  },
  {
    name: "Tarta de nata y fresas🍓",
    description: "100% casera",
    tipo: "Postre",
    region: "Mediterránea",
    tiempoMinutos: ">1 día",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/tarta_fresa_nata.png",
    ingredients: [
      "Bizcocho de tita",
      "Mermelada de fresa",
      "Sirope de fresas",
      "Fresas",
      "Nata montada"
    ],
    instructions: [
      "Cocinar un bizcocho de tita, dejar enfriar y cortar por la mitad.",
      "Mojar una mitad con sirope de fresas y untarla con mermelada.",
      "Colocar las fresas del sirope encima.",
      "Capa de nata montada.",
      "Colocar la otra tapa de bizcocho encima y mojarla con el resto del sirope y untarla con más mermelada.",
      "Capa de nata montada.",
      "Fresas al natural por encima."
    ],
    tips: ["Cuidado al montar la nata para que no se corte, tiene que estar todo muy frío"],
    fuente: "https://diegodoal.com/recetas/tarta-fresas-nata",
    fecha: "11/05/2025"
  },
  {
    name: "Ramen de pollo 🍜",
    description: "Por si se comió poco en Japón",
    tipo: "Salado",
    region: "Japón",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Comida en casa"],
    materiasPrimas: ["Carne"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/ramen_pollo.png",
    ingredients: [
      "Carcasa de pollo",
      "Cebolla",
      "Zanahoria",
      "Huevo",
      "Setas",
      "Salsa de soja",
      "Salsa de ostras",
      "Salsa de pescado",
      "Fideos",
      "Miso",
      "Carne a escoger: pollo cocido, carne picada…",
      "Aceite de sésamo",
      "Aceite picante",
      "Laurel"
    ],
    instructions: [
      "Preparar un caldo de pollo en la olla exprés durante 45 mins con la carcasa dorada, cebolla, zanahoria, laurel...",
      "Cocer un huevo durante 6 minutos.",
      "Saltear setas con salsa de soja y de ostras.",
      "Colocar al fondo del bowl salsa de soja y los fideos cocidos, verter por encima el caldo caliente con miso y salsa de pescado disueltos.",
      "Colocar por encima el huevo abierto, las setas y la carne a escoger.",
      "Terminar con aceite de sésamo y aceite picante."
    ],
    tips: ["Para hacer un caldo más rápido se puede hervir en agua carne de pollo y utilizarla después como topping"],
    fuente: "Sobredosis de ramen en Japón",
    fecha: "26/04/2025"
  },
  {
    name: "Flammkuchen",
    description: "Pizza extra fina, mil veces mejor que la base del Mercadona e igual de rápida",
    tipo: "Salado",
    region: "Italia",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Comida en casa"],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/Flammkuchen.png",
    ingredients: [
      "Harina 250g",
      "Agua 125ml",
      "Aceite 25ml",
      "Sal"
    ],
    instructions: [
      "Para dos masas: 250g de harina, 125ml de agua, 25ml de aceite y sal. Amasar y dejar reposando media hora.",
      "Dividir en dos y estirar lo más fino posible.",
      "Hornear al máximo del horno, con la bandeja/piedra precalentada y en la rendija más baja. 10 mins o 5 y 5 (rotando) si el horno reparte mal el calor."
    ],
    tips: ["-"],
    fuente: "https://paulasapron.com/flammkuchen-tradicional/",
    fecha: "26/04/2025"
  },
  {
    name: "Egg Kottu",
    description: "No onetwo egg, only one",
    tipo: "Salado",
    region: "India",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/egg_kottu.png",
    ingredients: [
      "Pan plano",
      "Zanahoria",
      "Cebolla",
      "Huevos",
      "Especias: curry, canela, hojas de curry…"
    ],
    instructions: [
      "Saltear las verduras picadas o ralladas.",
      "Añadir el pan picado.",
      "Añadir las especias.",
      "Coronar con huevo."
    ],
    tips: ["Pan plano necesario al 100%"],
    fuente: "Sri Lanka",
    fecha: "21/04/2025"
  },
  {
    name: "Pitas caseras",
    description: "Otro alimento diferente a las pitas de supermercado",
    tipo: "Pan",
    region: "Oriente Próximo",
    tiempoMinutos: ">1 hora",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/pitas.png",
    ingredients: [
      "Harina 360g",
      "Levadura seca 5g",
      "Sal",
      "Agua 240ml",
      "AOVE"
    ],
    instructions: [
      "Mezclar los secos.",
      "Amasar junto al agua y un chorrito de aceite (opcional).",
      "Fermentar durante dos horas.",
      "Separar en 9 bolas de 65g.",
      "Estirar pero sin que lleguen a ser translúcidas.",
      "Cocinar 3 mins en la cocotte precalentada a toda trisca en el horno con un chorrín de aceite."
    ],
    tips: [
      "Se pueden cocinar en horno o en vitro",
      "Cuidado con el aceite de la cocotte, al estar tan caliente puede quemarse"
    ],
    fuente: "Al Mrzab (Abu Dhabi)",
    fecha: "21/04/2025"
  },
  {
    name: "Baba ganoush",
    description: "Para sacar al centro y que desaparezca en un abrir y cerrar de ojos",
    tipo: "Aperitivo",
    region: "Oriente Próximo",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/baba_ganoush.png",
    ingredients: [
      "Berenjena",
      "Ajo",
      "Yogur",
      "Tahini",
      "Aceite de oliva virgen extra",
      "Zumo de limón",
      "Comino molido",
      "Pimentón dulce",
      "Pimienta negra molida",
      "Sal"
    ],
    instructions: [
      "Asar las berenjenas.",
      "Triturarlas con el resto de ingredientes.",
      "Servir con un chorro de aceite y granada."
    ],
    tips: ["Dejar reposar un rato para que se conozcan los sabores"],
    fuente: "Al Mrzab (Abu Dhabi)",
    fecha: "20/04/2025"
  },
  {
    name: "Arayes",
    description: "La mejor hamburguesa del mundo estaba en Abu Dhabi",
    tipo: "Salado",
    region: "Oriente Próximo",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Carne"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/arayes.png",
    ingredients: [
      "Carne picada",
      "Pitas",
      "Cebolla",
      "Ajo",
      "Especias: kebab mix, comino, clavo, canela, hierbabuena, sal y pimienta"
    ],
    instructions: [
      "Picar o rallar la cebolla y el ajo.",
      "Mezclarlas con la carne y las especias.",
      "Rellenar de la mezcla pitas partidas a la mitad o en cuartos.",
      "Marcar bien en la sartén."
    ],
    tips: ["Acompañar de alguna salsa de yogur"],
    fuente: "Al Mrzab (Abu Dhabi)",
    fecha: "19/04/2025"
  },
  {
    name: "Pastel de carne",
    description: "",
    tipo: "Salado",
    region: "Mediterránea",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Carne", "Patatas"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/pastel_carne.png",
    ingredients: [
      "Carne picada",
      "Patatas",
      "Bacon",
      "Cebolla",
      "Zanahorias",
      "Setas",
      "Caldo",
      "Vino blanco",
      "Leche entera",
      "Concentrado de tomate",
      "Guisantes congelados",
      "Parmesano",
      "Gruyere",
      "Apio",
      "Ajo",
      "Perejil",
      "Aceite de oliva virgen extra",
      "Sal",
      "Pimienta negra",
      "Cebollino"
    ],
    instructions: [
      "Dora la carne picada. Retírala y resérvala.",
      "Cocina el bacon hasta que suelte la grasa. Añade las setas.",
      "Añade el ajo y las verduras.",
      "Devuelve la carne y añade el perejil. Haz un hueco y tuesta el concentrado de tomate.",
      "Añade la leche y reduce hasta que casi desaparezca. Después añade el vino y reduce un par de minutos.",
      "Añade el caldo y cocina 30 minutos hasta que reduzca.",
      "Mezcla los guisantes congelados con el ragú y pásalo todo a una fuente de horno, presionando para dejarlo parejo.",
      "Cubre con el puré de patatas (mezclado con parmesano) y ralla por encima más queso.",
      "Hornea a 180 °C durante 20 minutos, hasta que esté dorado.",
      "Deja reposar 20 minutos y sirve con cebollino."
    ],
    tips: ["-"],
    fuente: "https://diegodoal.com/recetas/pastel-carne",
    fecha: "19/03/2025"
  },
  {
    name: "Cookies de chocolate aplastadas",
    description: "Best cookie ever",
    tipo: "Merienda",
    region: "USA",
    tiempoMinutos: ">1 día",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/cookies_aplastadas.png",
    ingredients: [
      "Chocolate",
      "Mantequilla",
      "Etc"
    ],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "https://www.instagram.com/reels/C_YcZ7qIXwz/",
    fecha: "19/03/2025"
  },
  {
    name: "Tarta tres leches",
    description: "Tributo al Mawey",
    tipo: "Postre",
    region: "México",
    tiempoMinutos: ">1 día",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/tarta_tres_leches.png",
    ingredients: ["Dulce de leche"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "Mawey Taco Bar",
    fecha: "09/02/2025"
  },
  {
    name: "Albóndigas morunas",
    description: "De lechazo, no de cordero/oveja",
    tipo: "Salado",
    region: "Oriente Próximo",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Tupper", "Comida en casa"],
    materiasPrimas: ["Carne"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/albondigas_morunas.png",
    ingredients: ["Lechazo"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "https://www.instagram.com/reels/DFascabtFPN/",
    fecha: "02/02/2025"
  },
  {
    name: "Tiramisú de Reyes",
    description: "O tiramiscón. Colaboración con la Ari desde Milano. Sublime",
    tipo: "Merienda",
    region: "Mediterránea",
    tiempoMinutos: ">1 día",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/tiramisu_reyes.png",
    ingredients: ["Mascarpone"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "Ari",
    fecha: "06/01/2025"
  },
  {
    name: "Quiche de verduras 🫛",
    description: "",
    tipo: "Salado",
    region: "Mediterránea",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/quiche.png",
    ingredients: [
      "1 o 2 puerros",
      "1 manojo de espárragos verdes",
      "1 bandeja de portobelo",
      "3/4 huevos",
      "250ml aprox de queso blanco batido 0% o queso cottage",
      "Extra: queso parmesano rallado al gusto"
    ],
    instructions: [
      "Cortar todas las verduras en trocitos pequeños y sofreír.",
      "Cuando esté el sofrito casi casi, meter la masa (con garbanzos por encima para que no suba) a 180 grados 10 minutos.",
      "Mezclar los huevos con nuez moscada, sal, el queso batido, el queso rallado y las verduras.",
      "Meter todo al horno 35 minutos a 180 grados y liiiisto."
    ],
    tips: [
      "Se puede hacer guarra cambiando el queso batido por la nata pero pa que?",
      "Se puede añadir salmón o beicon para darle un toque."
    ],
    fuente: "-",
    fecha: "23/12/2024"
  },
  {
    name: "Canelón de carrilleras, trufa y foie",
    description: "",
    tipo: "Salado",
    region: "Italia",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Tupper", "Comida en casa"],
    materiasPrimas: ["Carne", "Pasta"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/canelon_carrilleras_trufa_foie.png",
    ingredients: ["Pendiente"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "https://diegodoal.com/recetas/canelones-carrillera-foie",
    fecha: "23/12/2024"
  },
  {
    name: "Saam de cocktail de langostinos",
    description: "",
    tipo: "Aperitivo",
    region: "Mediterránea",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Marisco"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/saam_cocktail_langostinos.png",
    ingredients: [
      "Lechuga",
      "Langostinos",
      "Mayonesa"
    ],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "-",
    fecha: "07/12/2024"
  },
  {
    name: "Zarangollo",
    description: "Gran recuerdo de la ciudad de Murcia",
    tipo: "Salado",
    region: "Murcia",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/zarangollo.png",
    ingredients: [
      "Huevos",
      "Calabacín",
      "Cebolla"
    ],
    instructions: [
      "Sofreír cebolla y calabacín.",
      "Añadir huevos y hacer un revuelto."
    ],
    tips: [
      "SIN pimienta",
      "Añadir queso para extra de cremosidad"
    ],
    fuente: "Los bares de Murcia",
    fecha: "02/12/2024"
  },
  {
    name: "Parmiggiana con carne picada",
    description: "Versión menos ligera",
    tipo: "Salado",
    region: "Italia",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Tupper", "Comida en casa"],
    materiasPrimas: ["Carne", "Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/parmiggiana_carne.png",
    ingredients: [
      "Carne picada",
      "Berenjena"
    ],
    instructions: ["Pendiente"],
    tips: [
      "Asar las berenjenas enteras, esperar a que se sequen, pelar y cuando se enfríen cortar. Después, secarlas con papel para que no suelten tanta agua.",
      "Para el tomate casero, echar un poco de tomate concentrado, tomate frito, pimentón, cebolla, ajo y miel."
    ],
    fuente: "-",
    fecha: "01/12/2024"
  },
  {
    name: "Calamares rellenos",
    description: "",
    tipo: "Salado",
    region: "Mediterránea",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Marisco"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/calamares_rellenos.png",
    ingredients: [
      "Calamares",
      "Chalota",
      "Tomate concentrado",
      "Tomate cherry",
      "Pimiento asado",
      "Hierbas aromáticas: tomillo, orégano…",
      "Vinagre",
      "Limón"
    ],
    instructions: [
      "Sofrito de chalota, tomate concentrado, cherries y las patitas de los calamari.",
      "Aromatizar con hierbas, vinagre y lemon zest.",
      "Añadir pimiento asado al sofrito.",
      "Rellenar los calamares (no demasiado que gomitan) y marcarlos."
    ],
    tips: ["Dejar margen porque encogen mucho al dorarlos"],
    fuente: "https://www.instagram.com/reels/CwKU_W0oVBv/",
    fecha: "24/05/2024"
  },
  {
    name: "Ensalada griega",
    description: "El mediterraneo en todo su esplendor",
    tipo: "Ensalada",
    region: "Grecia",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/ensalada_griega.png",
    ingredients: [
      "Tomate",
      "Pepino",
      "Cebolla",
      "Pimiento verde",
      "Queso feta",
      "Orégano",
      "Vinagre",
      "AOVE"
    ],
    instructions: [
      "Poner a remojo la cebolla en juliana.",
      "Añadir el resto de verduras.",
      "Sazonar."
    ],
    tips: ["-"],
    fuente: "Bar de \"La alemana\" (Meteora)",
    fecha: "16/05/2024"
  },
  {
    name: "Spanakopita",
    description: "Las baklavas que puedo permitirme",
    tipo: "Aperitivo",
    region: "Grecia",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Verduras"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/spanakopita.png",
    ingredients: [
      "Espinacas (350 g)",
      "Perejil (60 g)",
      "Cebolla (1)",
      "Arroz (74 g)",
      "Huevo (1)",
      "Queso feta (225 g)",
      "Masa filo",
      "Aceite de oliva virgen extra",
      "Sal",
      "Pimienta (mucha)"
    ],
    instructions: [
      "Romper y masajear 350gr de espinacas, 60gr de perejil, aove, sal y mucha pimienta.",
      "Añadir una cebolla sofrita, 74gr de arroz y 1 huevo y volver a masajear.",
      "Mezclar con 225gr de queso feta.",
      "Colocar varias capas intercaladas de masa filo y aceite.",
      "Extender todo el relleno.",
      "Colocar el resto de capas de la misma forma.",
      "Media hora de nevera, cortarlo, aceite por encima y 40 mins de horno a 200ºC o hasta que esté dorada."
    ],
    tips: ["-"],
    fuente: "ΑΡΙΣΤΟΝ ΛΟΜΠΟΤΕΣΗΣ (Atenas)",
    fecha: "25/04/2024"
  },
  {
    name: "Carrilleras con puré de patata",
    description: "El tupper de la gente guay",
    tipo: "Salado",
    region: "Mediterránea",
    tiempoMinutos: ">1 hora",
    etiquetas: ["Tupper", "Comida en casa"],
    materiasPrimas: ["Carne", "Patatas"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/carrilleras_pure_patata.png",
    ingredients: [
      "Carrilleras",
      "Cebolla",
      "Zanahoria",
      "Tomate concentrado",
      "Tomate frito",
      "Carne de ñora",
      "Vino",
      "Puré de patata"
    ],
    instructions: [
      "Marcar las carrilleras y retirar.",
      "Sofrito de cebolla y zanahoria.",
      "Añadir tomate concentrado, tomate frito, carne de ñora…",
      "Desglasar con vino.",
      "Devolver las carrilleras y cubrir con agua.",
      "Cocer 45 mins en olla exprés.",
      "Reducir la salsa.",
      "Servir sobre puré de patata y bañada con salsa."
    ],
    tips: [
      "Triturar las verduras junto al caldo o desecharlas y reducir el líquido",
      "Deshilachar las carrilleras y mezclarlas con la reducción. Enfriarlas en un tupper y servirlas en lingotes marcados a la plancha"
    ],
    fuente: "",
    fecha: "25/04/2024"
  },
  {
    name: "Gnochis con salmón y parmesano",
    description: "Oficialmente hemos superado a los gnochis a la italiana",
    tipo: "Salado",
    region: "Italia",
    tiempoMinutos: "<30 minutos",
    etiquetas: [],
    materiasPrimas: ["Pescado", "Pasta"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/gnochis_salmon.png",
    ingredients: [
      "Gnochis",
      "Salmón",
      "Nata",
      "Parmesano"
    ],
    instructions: [
      "Marcar el salmón. Retirar.",
      "Marcar los gnochis.",
      "Devolver el salmón y añadir nata.",
      "Reducir y rematar con parmesano."
    ],
    tips: ["-"],
    fuente: "-",
    fecha: "16/04/2024"
  },
  {
    name: "Curry japonés de pollo y verduras 🥦🥕🧅",
    description: "EL plato no esperado de Japón",
    tipo: "Salado",
    region: "Japón",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Verduras", "Patatas"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/curry_japones.png",
    ingredients: [
      "Patatas",
      "Zanahorias",
      "Cebolla",
      "Pimiento",
      "Brócoli (opcional)",
      "Proteína: pollo, costilla...",
      "Especias: canela, comino, curry y laurel",
      "Manzana",
      "Salsa de soja"
    ],
    instructions: [
      "Cocinar la carne (por ejemplo, marcar contramuslos de pollo).",
      "Dorar en trozos grandes la cebolla, la zanahoria y el pimiento.",
      "Incluir las especias y chascar las patatas.",
      "Cubrir con agua y hervir 20 minutos.",
      "Añadir el brócoli 5 minutos antes de terminar.",
      "Rallar una manzana y añadir un chorrito de salsa de soja.",
      "Devolver la carne y reposar."
    ],
    tips: ["Servir con arroz blanco"],
    fuente: "https://diegodoal.com/recetas/curry-japones",
    fecha: "31/03/2024"
  },
  {
    name: "Chana Masala",
    description: "",
    tipo: "Salado",
    region: "India",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Legumbres"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/chana_masala.png",
    ingredients: ["Pendiente"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "-",
    fecha: ""
  },
  {
    name: "Tarta de manzana",
    description: "",
    tipo: "Postre",
    region: "Mediterránea",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: [],
    materiasPrimas: [],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/tarta_manzana.png",
    ingredients: ["Pendiente"],
    instructions: ["Pendiente"],
    tips: ["-"],
    fuente: "-",
    fecha: ""
  },
  {
    name: "Lentejas con curry y langonstins 🦐",
    description: "Receta ❌⭕",
    tipo: "Salado",
    region: "India",
    tiempoMinutos: "entre 30 - 60 minutos",
    etiquetas: ["Tupper"],
    materiasPrimas: ["Legumbres", "Marisco"],
    imageUrl: "https://raw.githubusercontent.com/algpanda/domicilio-conyugal-images/refs/heads/main/lentejas_curry_langostinos.png",
    ingredients: [
      "Lentejas",
      "Cabezas de carabinero",
      "Carabineros",
      "Jerez",
      "Caldo de pollo",
      "Zanahoria",
      "Jengibre",
      "Limón",
      "Ajo",
      "Tomate cherry",
      "Patata",
      "Curry",
      "Comino",
      "Tomate frito",
      "Hierbabuena",
      "Mantequilla",
      "Sal"
    ],
    instructions: [
      "Remojar las lentejas 3 horas.",
      "Pochar las cabezas de carabineros a fuego fuerte y desglasar con jerez.",
      "Añadir directamente a las lentejas en una olla.",
      "Añadir caldo de pollo, zanahorias picadas, jengibre, peladura de limón, tres ajos dorados, tomates cherry y patata en daditos.",
      "Sal.",
      "45 min - 1 hora a fuego bajo.",
      "Sacar las cabezas escurriéndolas.",
      "Quitar el jengibre.",
      "Tostar 3 cucharadas de curry y un poco de comino.",
      "Hacer una pasta con jerez y limón.",
      "Echarla a las lentejas.",
      "Añadir también tomate frito, hierbabuena y mantequilla en dados.",
      "Añadir los carabineros abiertos en mariposa y que se cocinen con el calor durante media hora de reposo."
    ],
    tips: ["-"],
    fuente: "https://www.youtube.com/watch?v=XHhC-Ihf5YQ",
    fecha: "05/02/2024"
  }
];
