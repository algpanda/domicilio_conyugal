const ACCESS_CODE = "1210";
const accessScreen = document.querySelector("#access-screen");
const accessForm = document.querySelector("#access-form");
const accessCode = document.querySelector("#access-code");
const accessError = document.querySelector("#access-error");
const app = document.querySelector("#app");

function showApp() {
  accessScreen.hidden = true;
  app.hidden = false;
}
function lockApp() {
  app.hidden = true;
  accessScreen.hidden = false;
  accessCode.value = "";
  accessError.textContent = "";
  accessCode.focus();
}
accessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (accessCode.value.trim() === ACCESS_CODE) {
    sessionStorage.setItem("casa-en-orden-unlocked", "true");
    accessError.textContent = "";
    showApp();
  } else {
    accessError.textContent = "Ese código no es correcto. Inténtalo de nuevo.";
    accessCode.select();
  }
});
document.querySelector("#lock-button").addEventListener("click", () => {
  sessionStorage.removeItem("casa-en-orden-unlocked");
  lockApp();
});

const recipes = window.RECETAS || [];
const RECIPES_PER_PAGE = 10;
const RECIPE_TYPES = ["Ensalada", "Salado", "Guarnición", "Postre", "Merienda","Aperitivo","Pan"];
const INGREDIENT_GROUPS = ["Carne", "Pescado", "Marisco", "Verduras", "Pasta", "Arroz", "Patatas"];
const RECIPE_REGIONS = ["India", "Corea", "Japón", "México", "Murcia", "Grecia", "Italia", "Sudamérica","Mediterránea","Oriente Próximo","USA"];
const DURATION_OPTIONS = [
  { value: "under30", label: "<30 minutos" },
  { value: "30to60", label: "entre 30 - 60 minutos" },
  { value: "over60", label: ">1 hora" },
  { value: "overDay", label: ">1 día" }
];
const DURATION_LABELS = new Map([
  ["<30 minutos", "<30 minutos"],
  ["30 - 60 minutos", "entre 30 - 60 minutos"],
  ["entre 30 - 60 minutos", "entre 30 - 60 minutos"],
  [">1 hora", ">1 hora"],
  [">1 día", ">1 día"]
]);
recipes.forEach((recipe) => {
  const storedDuration = window.RECIPE_DURATIONS?.[recipe.name] || recipe.duracion || recipe.tiempoMinutos;
  recipe.duracion = DURATION_LABELS.get(storedDuration) || storedDuration || "entre 30 - 60 minutos";
  delete recipe.minutes;
  delete recipe.tiempoMinutos;
});
const recipeStyles = document.createElement("link");
recipeStyles.rel = "stylesheet";
recipeStyles.href = "recipe.css";
document.head.append(recipeStyles);
function normalizeText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}
function getRecipeTags(recipe) {
  return Array.isArray(recipe.etiquetas) ? recipe.etiquetas.filter((tag) => typeof tag === "string" && tag.trim()) : [];
}
function typeLabel(recipe) {
  const type = recipe.tipo || recipe.category || "Salado";
  return type === "principal" || type === "salado" ? "Salado" : type === "guarnicion" ? "Guarnición" : type === "postre" ? "Postre" : type;
}
function buildMultiSelect(container, { name, label, options }) {
  const details = document.createElement("details");
  details.className = "recipe-multi-select";
  const summary = document.createElement("summary");
  summary.textContent = label;
  summary.setAttribute("aria-label", `${label}, desplegar opciones`);
  const list = document.createElement("div");
  list.className = "recipe-multi-options";
  options.forEach((option, index) => {
    const optionLabel = document.createElement("label");
    optionLabel.className = "recipe-multi-option";
    const input = document.createElement("input");
    input.type = "checkbox"; input.name = name; input.value = option; input.id = `${name}-${index}`;
    const text = document.createElement("span"); text.textContent = option;
    optionLabel.append(input, text); list.append(optionLabel);
  });
  details.append(summary, list); container.append(details);
}
function setupRecipePicker() {
  const section = document.createElement("section");
  section.className = "recipe-picker panel";
  section.setAttribute("aria-labelledby", "recipe-title");
  section.innerHTML = `
    <div class="panel-heading recipe-heading"><div><p class="eyebrow">¿QUÉ COCINAMOS HOY?</p><h2 id="recipe-title">Encuentra tu receta</h2></div><span class="recipe-icon" aria-hidden="true">♨</span></div>
    <p class="recipe-intro">Busca por nombre o ingrediente y combina los filtros que quieras.</p>
    <form id="recipe-form"><div class="recipe-search-row"><label class="recipe-field recipe-search-field" for="recipe-search">Nombre o ingrediente<input id="recipe-search" type="search" placeholder="Ej. calabaza, curry…"></label><button class="button recipe-filter-button" id="open-recipe-filters" type="button">Filtros</button></div>
      <fieldset class="recipe-mode-options"><legend>¿Cómo quieres ver los resultados?</legend><label class="recipe-mode-option"><input type="radio" name="recipe-mode" value="list" checked><span>Lista</span></label><label class="recipe-mode-option"><input type="radio" name="recipe-mode" value="random"><span>Al azar</span></label></fieldset>
      <div class="recipe-actions"><button class="button button-primary" type="submit">Buscar recetas <span aria-hidden="true">→</span></button><button id="clear-recipe-filters" class="recipe-clear" type="button">Limpiar búsqueda</button></div>
    </form><p id="recipe-message" class="recipe-message" aria-live="polite"></p><div id="recipe-results" class="recipe-results" aria-live="polite"></div><nav id="recipe-pagination" class="recipe-pagination" aria-label="Páginas de resultados" hidden></nav>
    <dialog id="recipe-filter-dialog" class="recipe-dialog recipe-filter-dialog" aria-labelledby="recipe-filter-title"><div class="recipe-dialog-header"><p class="eyebrow">AFINA LA BÚSQUEDA</p><button class="recipe-dialog-close filter-dialog-close" type="button" aria-label="Cerrar filtros">×</button></div><h2 id="recipe-filter-title">Filtros</h2>
      <form id="recipe-filter-form"><label class="recipe-field" for="recipe-type">Tipo de receta<select id="recipe-type" name="recipe-type"><option value="">Todos los tipos</option></select></label>
        <div class="recipe-filter-group"><p class="recipe-filter-label">Materia prima <small>Puedes escoger varias.</small></p><div id="recipe-ingredient-filters"></div></div>
        <label class="recipe-field" for="recipe-time">Tiempo de cocinado<select id="recipe-time" name="recipe-time"><option value="">Cualquier duración</option></select></label>
        <div class="recipe-filter-group"><p class="recipe-filter-label">Región <small>Puedes escoger varias.</small></p><div id="recipe-region-filters"></div></div>
        <fieldset class="recipe-options"><legend>Etiquetas <small>Al seleccionar varias, basta con que coincida una.</small></legend><div id="recipe-tag-options" class="recipe-tag-options"></div><p id="recipe-no-tags" class="recipe-no-tags">No hay etiquetas disponibles.</p></fieldset>
        <div class="recipe-actions"><button class="button button-primary" type="submit">Aplicar filtros</button><button id="reset-recipe-filters" class="recipe-clear" type="button">Limpiar filtros</button></div>
      </form>
    </dialog>
    <dialog id="recipe-details-dialog" class="recipe-dialog" aria-labelledby="recipe-dialog-title"><div class="recipe-dialog-header"><p class="eyebrow">PARA PONERSE EL DELANTAL</p><button class="recipe-dialog-close details-dialog-close" type="button" aria-label="Cerrar receta">×</button></div><div id="recipe-dialog-content"></div></dialog>`;
  const dashboard = document.querySelector("#inicio");
  dashboard.insertBefore(section, dashboard.querySelector(".content-grid"));
  const form = section.querySelector("#recipe-form");
  const filterForm = section.querySelector("#recipe-filter-form");
  const tagOptions = section.querySelector("#recipe-tag-options");
  const results = section.querySelector("#recipe-results");
  const pagination = section.querySelector("#recipe-pagination");
  const message = section.querySelector("#recipe-message");
  const filterDialog = section.querySelector("#recipe-filter-dialog");
  const detailsDialog = section.querySelector("#recipe-details-dialog");
  const dialogContent = section.querySelector("#recipe-dialog-content");
  let matchingRecipes = [];
  let currentPage = 1;
  RECIPE_TYPES.forEach((type) => { const option = document.createElement("option"); option.value = type; option.textContent = type; filterForm.querySelector("#recipe-type").append(option); });
  DURATION_OPTIONS.forEach(({ value, label }) => { const option = document.createElement("option"); option.value = value; option.textContent = label; filterForm.querySelector("#recipe-time").append(option); });
  buildMultiSelect(section.querySelector("#recipe-ingredient-filters"), { name: "recipe-ingredient-group", label: "Elegir materias primas", options: INGREDIENT_GROUPS });
  buildMultiSelect(section.querySelector("#recipe-region-filters"), { name: "recipe-region", label: "Elegir regiones", options: RECIPE_REGIONS });
  const tags = [...new Map(recipes.flatMap(getRecipeTags).map((tag) => [normalizeText(tag), tag.trim()])).values()].sort((a, b) => a.localeCompare(b, "es"));
  tags.forEach((tag, index) => {
    const label = document.createElement("label"); label.className = "recipe-option";
    const input = document.createElement("input"); input.type = "checkbox"; input.name = "recipe-tag"; input.value = tag; input.id = `recipe-tag-${index}`;
    const check = document.createElement("span"); check.className = "recipe-check"; check.setAttribute("aria-hidden", "true"); check.textContent = "✓";
    const text = document.createElement("span"); text.textContent = tag; label.append(input, check, text); tagOptions.append(label);
  });
  section.querySelector("#recipe-no-tags").hidden = tags.length > 0;
  section.querySelector("#open-recipe-filters").addEventListener("click", () => filterDialog.showModal());
  section.querySelector(".filter-dialog-close").addEventListener("click", () => filterDialog.close());
  section.querySelector(".details-dialog-close").addEventListener("click", () => detailsDialog.close());
  [filterDialog, detailsDialog].forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));
  filterForm.addEventListener("submit", (event) => { event.preventDefault(); filterDialog.close(); runSearch(); });
  section.querySelector("#reset-recipe-filters").addEventListener("click", () => filterForm.reset());
  form.addEventListener("submit", (event) => { event.preventDefault(); runSearch(); });
  section.querySelector("#clear-recipe-filters").addEventListener("click", () => { form.reset(); filterForm.reset(); results.replaceChildren(); pagination.replaceChildren(); pagination.hidden = true; message.textContent = ""; });

  function runSearch() {
    const query = normalizeText(section.querySelector("#recipe-search").value);
    const selectedType = filterForm.querySelector("#recipe-type").value;
    const duration = filterForm.querySelector("#recipe-time").value;
    const selectedIngredients = [...filterForm.querySelectorAll('input[name="recipe-ingredient-group"]:checked')].map((input) => input.value);
    const selectedRegions = [...filterForm.querySelectorAll('input[name="recipe-region"]:checked')].map((input) => normalizeText(input.value));
    const selectedTags = [...filterForm.querySelectorAll('input[name="recipe-tag"]:checked')].map((input) => normalizeText(input.value));
    const mode = form.querySelector('input[name="recipe-mode"]:checked').value;
    matchingRecipes = recipes.filter((recipe) => {
      const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
      if (query && !normalizeText(`${recipe.name} ${ingredients.join(" ")}`).includes(query)) return false;
      if (selectedType && normalizeText(typeLabel(recipe)) !== normalizeText(selectedType)) return false;
      const recipeIngredients = Array.isArray(recipe.materiasPrimas) ? recipe.materiasPrimas : [];
      if (selectedIngredients.length && !selectedIngredients.some((item) => recipeIngredients.includes(item))) return false;
      const region = normalizeText(recipe.region || "");
      if (selectedRegions.length && !selectedRegions.includes(region)) return false;
      const recipeTags = getRecipeTags(recipe).map(normalizeText);
      if (selectedTags.length && !selectedTags.some((tag) => recipeTags.includes(tag))) return false;
      if (duration && recipe.duracion !== DURATION_OPTIONS.find((option) => option.value === duration)?.label) return false;
      return true;
    });
    results.replaceChildren(); pagination.replaceChildren(); pagination.hidden = true; currentPage = 1;
    if (!matchingRecipes.length) { message.textContent = "No hay recetas que coincidan. Prueba a cambiar o quitar algún criterio."; return; }
    if (mode === "random") { const selected = matchingRecipes[Math.floor(Math.random() * matchingRecipes.length)]; message.textContent = "Tu receta elegida al azar (pulsa para ver los detalles):"; renderRecipe(selected, results, openRecipeDetails); return; }
    const totalPages = Math.ceil(matchingRecipes.length / RECIPES_PER_PAGE);
    message.textContent = `${matchingRecipes.length} ${matchingRecipes.length === 1 ? "receta encontrada" : "recetas encontradas"}. Pulsa una para ver sus detalles.`;
    renderPage(); if (totalPages > 1) renderPagination(totalPages);
  }
  function renderPage() { results.replaceChildren(); const start = (currentPage - 1) * RECIPES_PER_PAGE; matchingRecipes.slice(start, start + RECIPES_PER_PAGE).forEach((recipe) => renderRecipe(recipe, results, openRecipeDetails)); }
  function renderPagination(totalPages) {
    pagination.hidden = false;
    const previous = document.createElement("button"); previous.type = "button"; previous.className = "page-button"; previous.textContent = "← Anterior"; previous.disabled = currentPage === 1;
    previous.addEventListener("click", () => { currentPage -= 1; renderPage(); renderPagination(totalPages); });
    const status = document.createElement("span"); status.className = "page-status"; status.setAttribute("aria-live", "polite"); status.textContent = `Página ${currentPage} de ${totalPages}`;
    const next = document.createElement("button"); next.type = "button"; next.className = "page-button"; next.textContent = "Siguiente →"; next.disabled = currentPage === totalPages;
    next.addEventListener("click", () => { currentPage += 1; renderPage(); renderPagination(totalPages); }); pagination.replaceChildren(previous, status, next);
  }
  function openRecipeDetails(recipe) {
    dialogContent.replaceChildren();
    const title = document.createElement("h2"); title.id = "recipe-dialog-title"; title.textContent = recipe.name;
    const description = document.createElement("p"); description.className = "recipe-dialog-description"; description.textContent = recipe.description || "";
    const facts = document.createElement("p"); facts.className = "recipe-dialog-facts"; facts.textContent = `${recipe.servings || "—"} raciones · ${typeLabel(recipe)}`;
    const ingredientsHeading = document.createElement("h3"); ingredientsHeading.textContent = "Ingredientes";
    const ingredientList = document.createElement("ul"); ingredientList.className = "recipe-ingredient-list";
    (Array.isArray(recipe.ingredients) ? recipe.ingredients : []).forEach((ingredient) => { const item = document.createElement("li"); item.textContent = ingredient; ingredientList.append(item); });
    const instructionsHeading = document.createElement("h3"); instructionsHeading.textContent = "Preparación";
    const instructions = document.createElement("p"); instructions.className = "recipe-instructions"; instructions.textContent = Array.isArray(recipe.instructions) ? recipe.instructions.join(" ") : "";
    dialogContent.append(title, description, facts, ingredientsHeading, ingredientList, instructionsHeading, instructions);
    detailsDialog.showModal(); section.querySelector(".details-dialog-close").focus();
  }
}
function renderRecipe(recipe, container, onSelect) {
  const card = document.createElement("button"); card.className = "recipe-card"; card.type = "button"; card.setAttribute("aria-label", `Ver receta: ${recipe.name}`);
  if (recipe.novedad === "Sí") {
    card.classList.add("recipe-card-new");
  } else if (Array.isArray(recipe.instructions) && recipe.instructions.includes("Pendiente")) {
    card.classList.add("recipe-card-pending");
  }
  const title = document.createElement("h3"); title.textContent = recipe.name;
  const description = document.createElement("p"); description.textContent = recipe.description || "";
  const details = document.createElement("div"); details.className = "recipe-details"; details.textContent = `${(recipe.ingredients || []).length} ingredientes · ${typeLabel(recipe)}`;
  const tags = document.createElement("div"); tags.className = "recipe-card-tags";
  getRecipeTags(recipe).forEach((tag) => { const badge = document.createElement("span"); badge.className = "recipe-tag-badge"; badge.textContent = tag; tags.append(badge); });
  const prompt = document.createElement("span"); prompt.className = "recipe-card-prompt"; prompt.textContent = "Ver ingredientes y preparación →";
  card.append(title, description, details, tags, prompt); card.addEventListener("click", () => onSelect(recipe)); container.append(card);
}
setupRecipePicker();
document.querySelector("#today").textContent = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
if (sessionStorage.getItem("casa-en-orden-unlocked") === "true") showApp(); else accessCode.focus();
