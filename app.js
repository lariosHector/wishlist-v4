const filterState = {
  tags: new Set(), // etiquetas seleccionadas
  priorityOnly: false, // checkbox "Solo prioritarios"
  hidePurchased: false, // checkbox "Ocultar comprados"
};
let activeSection = "__all__";

function createGiftCard(gift) {
  const article = document.createElement("article");
  article.className =
    "gift-card gift-card--soft relative flex flex-col h-full transform transition hover:-translate-y-1 hover:shadow-lg";

  // Badge de prioridad
  if (gift.priority) {
    const badge = document.createElement("div");
    badge.className =
      "gift-card__priority absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded z-10";
    badge.textContent = "Prioritario";
    article.appendChild(badge);
  }

  // Badge de comprado
  if (gift.purchased) {
    const purchasedBadge = document.createElement("div");
    purchasedBadge.className =
      "gift-card__purchased absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded z-10";
    purchasedBadge.textContent = "Comprado";
    article.appendChild(purchasedBadge);
  }

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

    const label = (gift.storeLabel || "Ver producto").toLowerCase();

    let storeClass = "gift-card__button"; // default

    if (label.includes("amazon")) {
      storeClass = "gift-card__amazon_button";
    } else if (label.includes("ikea")) {
      storeClass = "gift-card__ikea_button";
    } else if (label.includes("liverpool") || label.includes("meli")) {
      storeClass = "gift-card__liverpool_button";
    } else if (label.includes("xiaomi")) {
      storeClass = "gift-card__xiaomi_button";
    } else if (label.includes("corsair")) {
      storeClass = "gift-card__corsair_button";
    } else if (label.includes("lego")) {  
      storeClass = "gift-card__lego_button";
    }

    storeLink.className = storeClass;
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

async function injectFilterComponent() {
  const container = document.querySelector("[data-filter-placeholder]");
  if (!container) return;

  try {
    const res = await fetch("filter-component.html");
    if (!res.ok) {
      console.warn("No se pudo cargar filter-component.html");
      return;
    }
    const html = await res.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("Error cargando filter-component.html", error);
  }
}

function renderAllGifts() {
  Object.values(CATEGORY_CONTAINER_IDS).forEach((id) => {
    const c = document.getElementById(id);
    if (c) c.innerHTML = "";
  });

  gifts.forEach((gift) => {
    const containerId = CATEGORY_CONTAINER_IDS[gift.category];
    if (!containerId) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const card = createGiftCard(gift);
    container.appendChild(card);
  });
}

function buildTagOptionsFromGifts(gifts) {
  const select = document.querySelector("[data-filter-tag-select]");
  if (!select) return;

  const allTags = new Set();

  gifts.forEach((gift) => {
    (gift.tags || []).forEach((tag) => allTags.add(tag));
  });
  select.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "__all__";
  allOption.textContent = "Filtrar por etiqueta";
  select.appendChild(allOption);

  [...allTags].sort().forEach((tag) => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    select.appendChild(opt);
  });
}

function buildTagOptionsFromGifts() {
  const select = document.querySelector("[data-filter-tag-select]");
  if (!select) return;

  const allTags = new Set();

  gifts.forEach((gift) => {
    (gift.tags || []).forEach((tag) => allTags.add(tag));
  });
  select.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "__all__";
  allOption.textContent = "Filtrar por etiqueta";
  select.appendChild(allOption);

  [...allTags].sort().forEach((tag) => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    select.appendChild(opt);
  });
}

function renderWithFilters() {
  // 1. Limpiar todos los contenedores
  Object.values(CATEGORY_CONTAINER_IDS).forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = "";
  });

  const visibleCategories = new Set();

  // 2. Aplicar filtros de prioridad / purchased / tags
  const filtered = gifts.filter((gift) => {
    // Prioridad
    if (filterState.priorityOnly && !gift.priority) return false;

    // Ocultar comprados
    if (filterState.hidePurchased && gift.purchased) return false;

    // Filtro por etiquetas
    if (filterState.tags.size > 0) {
      const giftTags = gift.tags || [];
      const hasAtLeastOne = giftTags.some((t) => filterState.tags.has(t));
      if (!hasAtLeastOne) return false;
    }

    return true;
  });

  // 3. Pintar solo la sección activa (o todas si "__all__")
  filtered.forEach((gift) => {
    // Si hay sección activa específica y este gift no es de esa categoría, lo saltamos
    if (activeSection !== "__all__" && gift.category !== activeSection) return;

    const containerId = CATEGORY_CONTAINER_IDS[gift.category];
    if (!containerId) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const card = createGiftCard(gift);
    container.appendChild(card);

    visibleCategories.add(gift.category);
  });

  // 4. Mostrar/ocultar secciones según activeSection y si tienen resultados
  Object.keys(CATEGORY_CONTAINER_IDS).forEach((category) => {
    const sectionEl = document.querySelector(`[data-section="${category}"]`);
    if (!sectionEl) return;

    if (activeSection === "__all__") {
      // Modo "todas las secciones": solo ocultar las que no tengan resultados
      sectionEl.style.display = visibleCategories.has(category) ? "" : "none";
    } else {
      // Modo "una sección": solo mostrar la elegida y si tiene resultados
      if (category === activeSection && visibleCategories.has(category)) {
        sectionEl.style.display = "";
      } else {
        sectionEl.style.display = "none";
      }
    }
  });
}

function addActiveTagChip(tag) {
  const container = document.querySelector("[data-active-tags]");
  const select = document.querySelector("[data-filter-tag-select]");
  if (!container || !select) return;
  if (filterState.tags.has(tag)) return;

  filterState.tags.add(tag);

  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "filter-chip filter-chip--active-tag";
  chip.dataset.tag = tag;
  chip.textContent = tag + " ✕";

  chip.addEventListener("click", () => {
    filterState.tags.delete(tag);
    chip.remove();

    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    select.appendChild(opt);

    const options = [...select.querySelectorAll("option")]
      .filter((o) => o.value !== "__all__")
      .sort((a, b) => a.textContent.localeCompare(b.textContent));
    const allOpt = select.querySelector('option[value="__all__"]');
    select.innerHTML = "";
    if (allOpt) select.appendChild(allOpt);
    options.forEach((o) => select.appendChild(o));

    renderWithFilters();
  });

  container.appendChild(chip);
}
function setupTagSelectHandler() {
  const select = document.querySelector("[data-filter-tag-select]");
  if (!select) return;

  select.addEventListener("change", () => {
    const value = select.value;

    if (!value || value === "__all__") {
      filterState.tags.clear();

      const activeTagsContainer = document.querySelector("[data-active-tags]");
      if (activeTagsContainer) {
        activeTagsContainer.innerHTML = "";
      }
      buildTagOptionsFromGifts();

      const newSelect = document.querySelector("[data-filter-tag-select]");
      if (newSelect) {
        newSelect.value = "__all__";
      }

      renderWithFilters();
      return;
    }

    const optionToRemove = select.querySelector(`option[value="${value}"]`);
    if (optionToRemove) optionToRemove.remove();
    select.value = "__all__";
    addActiveTagChip(value);
    renderWithFilters();
  });
}

function setupCheckboxFilters() {
  const priorityCheckbox = document.querySelector("[data-filter-priority]");
  const purchasedCheckbox = document.querySelector("[data-filter-purchased]");

  if (priorityCheckbox) {
    priorityCheckbox.addEventListener("change", () => {
      filterState.priorityOnly = priorityCheckbox.checked;
      renderWithFilters();
    });
  }

  if (purchasedCheckbox) {
    purchasedCheckbox.addEventListener("change", () => {
      filterState.hidePurchased = purchasedCheckbox.checked;
      renderWithFilters();
    });
  }
}
function setupHideOnScroll() {
  const topShell = document.querySelector(".top-shell");
  if (!topShell) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // Scroll hacia abajo (y no justo al inicio de la página)
    if (current > lastScrollY && current > 80) {
      topShell.classList.add("top-shell--hidden");
    } else {
      // Scroll hacia arriba o cerca del top
      topShell.classList.remove("top-shell--hidden");
    }

    lastScrollY = current;
  });
}
function setupNavSectionFilter() {
  const navLinks = document.querySelectorAll("[data-nav-section]");
  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const section = link.dataset.navSection || "__all__";
      activeSection = section;

      // Re-render con la sección activa
      renderWithFilters();

      // Scroll suave a la sección, si no es "__all__"
      if (activeSection !== "__all__") {
        const target = document.querySelector(
          `[data-section="${activeSection}"]`
        );
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
}


document.addEventListener("DOMContentLoaded", async () => {
  await injectFilterComponent();
  buildTagOptionsFromGifts();
  setupHideOnScroll(); 
  setupTagSelectHandler();
  setupCheckboxFilters();
  setupNavSectionFilter();
  renderWithFilters();
});
