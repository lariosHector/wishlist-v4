// app.js
// Datos de regalos + render dinámico + botón "Buscar en Google"

const gifts = [
  // === SETUP / ESCRITORIO ======================================
  {
    id: "multicontacto-escritorio",
    name: "Multicontacto de escritorio",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/41-h7XXl5SL._SS600_.jpg",
    tags: ["6 enchufes", "USB-C PD"],
    search: "multicontacto escritorio 6 enchufes usb c",
    storeUrl: "https://www.amazon.com.mx/dp/B0BS72G3LY/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "multicontacto-clip-mesa",
    name: "Multicontacto AnnTane (clip de mesa)",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/318CEcxN97L._SS600_.jpg",
    tags: ["40W total", "4x USB-C"],
    search: "multicontacto escritorio clip mesa AnnTane 40W",
    storeUrl: "https://www.amazon.com.mx/dp/B0F625CQM2/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "mousepad-asus",
    name: "Mousepad Asus ROG Sheath XL",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/414Y+Q2dTfL._SS600_.jpg",
    tags: ["Tamaño XL", "Base antideslizante"],
    search: "Asus ROG Sheath mousepad XL",
    storeUrl: "https://www.amazon.com.mx/dp/B01G5ATZAE/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "mouspad-excovip-xxl-planetas",
    name: "Mousepad Excovip XXL Planetas",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/71EZuG4REfL._AC_SL1500_.jpg",
    tags: ["Tamaño XXL", "Diseño planetas"],
    search: "Excovip XXL mousepad planetas",
    storeUrl: "https://a.co/d/3Vzlv5F",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "mousepad-corsair",
    name: "Mousepad Corsair MM700 RGB",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/21GzCLYWWeL._SS600_.jpg",
    tags: ["XL", "RGB"],
    search: "Corsair MM700 RGB extended mouse pad",
    storeUrl:
      "https://www.corsair.com/lm/es/p/mousepads/ch-9417080-ww/mm700-rgb-extended-3xl-cloth-gaming-mouse-pad-desk-mat-ch-9417080-ww",
    storeLabel: "Ver en Corsair",
  },
  {
    id: "soporte-monitor-linkon",
    name: "Soporte para monitor Linkon",
    category: "setup",
    image: "https://ss637.liverpool.com.mx/xl/1175098409.jpg",
    tags: ["Ajustable", "Liverpool"],
    search: "Soporte para monitor de escritorio Linkon",
    storeUrl:
      "https://www.liverpool.com.mx/tienda/pdp/soporte-para-monitor-de-escritorio-linkon/99983759943",
    storeLabel: "Ver en Liverpool",
  },
  {
    id: "soporte-movil-tv",
    name: "Soporte móvil para monitor / TV",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/41r4JFl5QoL._SS600_.jpg",
    tags: ["Hasta 65″", "Altura ajustable"],
    search: "soporte móvil para tv 65 pulgadas altura ajustable",
    storeUrl: "https://www.amazon.com.mx/dp/B0DHZ6H7JL/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "xiaomi-monitor-lightbar",
    name: "Xiaomi Mi Computer Monitor Light Bar",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/414OKh3xZlL.jpg",
    tags: ["Luz asimétrica", "Ahorra espacio"],
    search: "Xiaomi Mi Computer Monitor Light Bar",
    storeUrl:
      "https://www.mi.com/mx/product/mi-computer-monitor-light-bar/buy/",
    storeLabel: "Ver en Xiaomi",
  },
  {
    id: "echo-dot",
    name: "Amazon Echo Dot (5ª gen)",
    category: "setup",
    image: "https://m.media-amazon.com/images/I/319ZaoJcE6L._AC_.jpg",
    tags: ["Alexa", "Asistente de voz"],
    search: "Amazon Echo Dot 5a generación",
    storeUrl: "https://www.amazon.com.mx/dp/B09B8V1LZ3/",
    storeLabel: "Ver en Amazon",
  },

  // === DÍA A DÍA / MOVILIDAD ===================================
  {
    id: "mochila-borealis",
    name: "Mochila The North Face Borealis",
    category: "daylife",
    image: "https://m.media-amazon.com/images/I/41VxXMEmszL._SS600_.jpg",
    tags: ["Para laptop", "Uso diario"],
    search: "Mochila The North Face Borealis laptop",
    storeUrl: "https://www.amazon.com.mx/dp/B0CN9S5SWD/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "portafolios-lubardy",
    name: "Portafolios Lubardy para laptop",
    category: "daylife",
    image: "https://m.media-amazon.com/images/I/71-ztHgv9YL._AC_SL1500_.jpg",
    tags: ["16″", "Imitación cuero"],
    search: "Portafolios Lubardy 16 pulgadas laptop",
    storeUrl: "https://www.amazon.com.mx/dp/B0D83VR6GV/",
    storeLabel: "Ver en Amazon",
  },

  // === BAJO ELÉCTRICO ==========================================
  {
    id: "fender-correa-piel",
    name: "Correa de piel Fender",
    category: "bass",
    image: "https://m.media-amazon.com/images/I/41IHjUTR-EL._SS600_.jpg",
    tags: ["Piel", "Clásica"],
    search: "Fender leather strap brown bass",
    storeUrl: "https://www.amazon.com.mx/dp/B000EELFI8/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "fender-correa-pana",
    name: "Correa Fender de pana",
    category: "bass",
    image: "https://m.media-amazon.com/images/I/41wZ5YnU9bL._SS600_.jpg",
    tags: ["Vintage", "Suave"],
    search: "Fender corduroy strap",
    storeUrl: "https://www.amazon.com.mx/dp/B0B9QN1H4G/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "fender-animal-print",
    name: "Correa Fender Animal Print",
    category: "bass",
    image: "https://m.media-amazon.com/images/I/41+GI4pTT4L._SS600_.jpg",
    tags: ["Cebra", "Statement"],
    search: "Fender animal print strap zebra",
    storeUrl: "https://www.amazon.com.mx/dp/B08CSXZDVP/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "levys-leather-wide",
    name: "Correa Levy's de piel ancha",
    category: "bass",
    image: "https://m.media-amazon.com/images/I/31gO1Lu+UCL._SS600_.jpg",
    tags: ["7.6 cm", "Extra cómoda"],
    search: "Levy's leather 3 inch bass strap",
    storeUrl: "https://www.amazon.com.mx/dp/B0845Q9BTT/",
    storeLabel: "Ver en Amazon",
  },

  // === PERFUMES ================================================
  {
    id: "polo-sport",
    name: "Ralph Lauren Polo Sport EDT",
    category: "perfumes",
    image: "https://ss701.liverpool.com.mx/xl/6783422.jpg",
    tags: ["Fresco", "Clásico"],
    search: "Ralph Lauren Polo Sport EDT 125ml",
    storeUrl: "https://www.amazon.com.mx/dp/B00EXW1PRS/",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "Armaf_odyssey_limoni",
    name: "Armaf Odyssey Limoni EDP",
    category: "perfumes",
    image: "https://m.media-amazon.com/images/I/61hLQ5ujH3L._AC_SL1500_.jpg",
    tags: ["Cítrico", "Juvenil", "Fresco"],
    search: "Armaf Odyssey Limoni EDP 100ml",
    storeUrl: "https://a.co/d/76SFjsK",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "Armaf_Odyssey_Dubai_Chocolat",
    name: "Armaf Odyssey Dubai Chocolat EDP",
    category: "perfumes",
    image: "https://m.media-amazon.com/images/I/7143opljnoL._AC_SL1500_.jpg",
    tags: ["Dulce", "Cálido", "Gourmand"],
    search: "Armaf Odyssey Dubai Chocolat EDP 100ml",
    storeUrl: "https://a.co/d/2WleseG",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "Lacoste_L.12.12_Blanco",
    name: "Lacoste L.12.12 Blanc EDT",
    category: "perfumes",
    image: "https://m.media-amazon.com/images/I/71Pk21AjqWL._AC_SL1500_.jpg",
    tags: ["Fresco", "Versátil", "Cítrico"],
    search: "Lacoste L.12.12 Blanc EDT 100ml",
    storeUrl: "https://a.co/d/37zJw0Q",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "Moschino_Toy_Boy_Edp",
    name: "Moschino Toy Boy EDP",
    category: "perfumes",
    image: "https://m.media-amazon.com/images/I/510i5dxTWoL._AC_SL1000_.jpg",
    tags: ["Amaderado", "Especiado", "Moderno"],
    search: "Moschino Toy Boy EDP 100ml",
    storeUrl: "https://a.co/d/ePQstfs",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "Hugo_by_Hugo_Boss",
    name: "Hugo by Hugo Boss EDT",
    category: "perfumes",
    image: "https://m.media-amazon.com/images/I/71n7lCqrv-L._AC_SL1500_.jpg",
    tags: ["Fresco", "Verde"],
    search: "Hugo by Hugo Boss EDT 125ml",
    storeUrl: "https://a.co/d/5GWKtRw",
    storeLabel: "Ver en Amazon",
  },

  // === ENTRETENIMIENTO =========================================
  {
    id: "lego-jazz-quartet",
    name: "LEGO Ideas Jazz Quartet 21334",
    category: "fun",
    image:
      "https://www.lego.com/cdn/cs/set/assets/blt626a07dcab0e99bd/21334_alt1.png?format=webply&fit=bounds&quality=60&width=800&height=800&dpr=2",
    tags: ["Set de construcción", "Display"],
    search: "LEGO Ideas Jazz Quartet 21334",
    storeUrl: "https://www.lego.com/es-mx/product/jazz-quartet-21334",
    storeLabel: "Ver en LEGO",
  },
  {
    id: "bbng-vinyl-lll",
    name: "Vinilo BadBadNotGood III",
    category: "fun",
    image: "https://m.media-amazon.com/images/I/618sBBU7vTL._AC_SL1500_.jpg",
    tags: ["Vinilo", "Jazz fusion"],
    search: "BadBadNotGood III vinyl",
    storeUrl: "https://a.co/d/gkhZTeb",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "MF-doom-mm-food-vinyl",
    name: "Vinilo MF DOOM - Mm..Food",
    category: "fun",
    image: "https://m.media-amazon.com/images/I/81yLIHzNaDL._AC_SL1500_.jpg",
    tags: ["Vinilo", "Hip hop"],
    search: "MF DOOM Mm..Food vinyl",
    storeUrl: "https://a.co/d/cI6VYac",
    storeLabel: "Ver en Amazon",
  },
  {
    id: "bbng-vinyl-iv",
    name: "Vinilo BadBadNotGood IV",
    category: "fun",
    image: "https://m.media-amazon.com/images/I/719qN5IueZL._AC_SL1500_.jpg",
    tags: ["Vinilo", "Jazz fusion"],
    search: "BadBadNotGood IV vinyl",
    storeUrl: "https://a.co/d/8Z9Jfz5",
    storeLabel: "Ver en Amazon",
  },

  // === SNACKS (ejemplo genérico) ===============================
  {
    id: "Surtido_Turrones_Ean_200_Grs",
    name: "Surtido Turrones Ean 200 Grs",
    category: "snacks",
    image: "https://m.media-amazon.com/images/I/71sLyKCcLcL._AC_SL1500_.jpg",
    tags: ["Turrones", "Navideños"],
    search: "Surtido Turrones Ean 200 Grs",
    storeUrl: "https://a.co/d/acViYbG",
    storeLabel: "Ver en Amazon",
  },

  // === Otras categorias ===

  {
    id: "Pococo_Proyector_de_estrellas",
    name: "Pococo Proyector de estrellas",
    category: "all",
    image: "https://m.media-amazon.com/images/I/71qT0Tg0xDL._AC_SL1500_.jpg",
    tags: ["Proyector", "Estrellas"],
    search: "Pococo Proyector de estrellas",
    storeUrl: "https://a.co/d/8Tbm0ZE",
    storeLabel: "Ver en Amazon",
  },
];

const CATEGORY_CONTAINER_IDS = {
  setup: "cards-setup",
  daylife: "cards-daylife",
  bass: "cards-bass",
  perfumes: "cards-perfumes",
  fun: "cards-fun",
  snacks: "cards-snacks",
  all: "cards-all"
};

function createGiftCard(gift) {
  const article = document.createElement("article");
  article.className =
    "gift-card gift-card--soft flex flex-col h-full transform transition hover:-translate-y-1 hover:shadow-lg";

  const media = document.createElement("div");
  media.className = "gift-card__media";

  if (gift.image) {
    const img = document.createElement("img");
    img.src = gift.image;
    img.alt = gift.name;
    img.loading = "lazy";
    media.appendChild(img);
  } else {
    media.classList.add("gift-card__media--icon");
    const span = document.createElement("span");
    span.className = "emoji-icon";
    span.textContent = gift.emoji || "🎁";
    media.appendChild(span);
  }

  const body = document.createElement("div");
  body.className = "gift-card__body p-6 flex flex-col flex-1";

  const title = document.createElement("h3");
  title.className = "gift-card__title";
  title.textContent = gift.name;
  body.appendChild(title);

  if (gift.tags && gift.tags.length) {
    const tagsDiv = document.createElement("div");
    tagsDiv.className = "gift-card__tags mt-2";
    gift.tags.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagsDiv.appendChild(span);
    });
    body.appendChild(tagsDiv);
  }

  const buttons = document.createElement("div");
  buttons.className = "mt-4 flex flex-wrap gap-2";

  if (gift.storeUrl) {
    const storeLink = document.createElement("a");
    storeLink.href = gift.storeUrl;
    storeLink.target = "_blank";
    storeLink.rel = "noopener noreferrer";
    storeLink.className = "gift-card__button";
    storeLink.textContent = gift.storeLabel || "Ver producto";
    buttons.appendChild(storeLink);
  }

  const googleBtn = document.createElement("button");
  googleBtn.type = "button";
  googleBtn.className = "gift-card__google_button gift-card__button--ghost";
  googleBtn.textContent = "Buscar en Google";
  googleBtn.addEventListener("click", () => {
    const query = gift.search || gift.name;
    const url = "https://www.google.com/search?q=" + encodeURIComponent(query);
    window.open(url, "_blank");
  });
  buttons.appendChild(googleBtn);

  body.appendChild(buttons);

  article.appendChild(media);
  article.appendChild(body);

  return article;
}

document.addEventListener("DOMContentLoaded", () => {
  gifts.forEach((gift) => {
    const containerId = CATEGORY_CONTAINER_IDS[gift.category];
    if (!containerId) return;
    const container = document.getElementById(containerId);
    if (!container) return;

    const card = createGiftCard(gift);
    container.appendChild(card);
  });
});
