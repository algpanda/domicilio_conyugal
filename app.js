const ACCESS_CODE = "1210";
const STORAGE_KEYS = { tasks: "casa-en-orden-tasks", shopping: "casa-en-orden-shopping" };

const accessScreen = document.querySelector("#access-screen");
const accessForm = document.querySelector("#access-form");
const accessCode = document.querySelector("#access-code");
const accessError = document.querySelector("#access-error");
const app = document.querySelector("#app");

function showApp() {
  accessScreen.hidden = true;
  app.hidden = false;
  document.querySelector("#task-input").focus();
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

const readItems = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

let tasks = readItems(STORAGE_KEYS.tasks);
let shopping = readItems(STORAGE_KEYS.shopping);

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function renderList(items, listElement, emptyElement, key, onToggle) {
  listElement.replaceChildren();
  emptyElement.hidden = items.length > 0;

  items.forEach((item) => {
    const row = document.createElement("li");
    row.className = `list-item${item.done ? " is-done" : ""}`;

    const toggle = document.createElement("button");
    toggle.className = "item-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", item.done ? `Marcar ${item.text} como pendiente` : `Marcar ${item.text} como hecho`);
    toggle.setAttribute("aria-pressed", String(item.done));
    toggle.textContent = item.done ? "✓" : "";
    toggle.addEventListener("click", () => onToggle(item.id));

    const text = document.createElement("span");
    text.className = "item-text";
    text.textContent = item.text;

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.type = "button";
    remove.setAttribute("aria-label", `Eliminar ${item.text}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      const remaining = items.filter((entry) => entry.id !== item.id);
      if (key === STORAGE_KEYS.tasks) tasks = remaining;
      else shopping = remaining;
      saveItems(key, remaining);
      renderAll();
    });

    row.append(toggle, text, remove);
    listElement.append(row);
  });
}

function renderAll() {
  renderList(tasks, document.querySelector("#task-list"), document.querySelector("#empty-tasks"), STORAGE_KEYS.tasks, (id) => {
    tasks = tasks.map((item) => item.id === id ? { ...item, done: !item.done } : item);
    saveItems(STORAGE_KEYS.tasks, tasks);
    renderAll();
  });
  renderList(shopping, document.querySelector("#shopping-list"), document.querySelector("#empty-shopping"), STORAGE_KEYS.shopping, (id) => {
    shopping = shopping.map((item) => item.id === id ? { ...item, done: !item.done } : item);
    saveItems(STORAGE_KEYS.shopping, shopping);
    renderAll();
  });
  document.querySelector("#pending-count").textContent = tasks.filter((item) => !item.done).length;
  document.querySelector("#shopping-count").textContent = shopping.filter((item) => !item.done).length;
}

function addItem(form, input, collection, key) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const updated = [...collection(), { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, text, done: false }];
    if (key === STORAGE_KEYS.tasks) tasks = updated;
    else shopping = updated;
    saveItems(key, updated);
    input.value = "";
    input.focus();
    renderAll();
  });
}

addItem(document.querySelector("#task-form"), document.querySelector("#task-input"), () => tasks, STORAGE_KEYS.tasks);
addItem(document.querySelector("#shopping-form"), document.querySelector("#shopping-input"), () => shopping, STORAGE_KEYS.shopping);

// El catálogo se mantiene en recetas.js, separado de la lógica de la aplicación.
const recipes = window.RECETAS || [];

const recipeStyles = document.createElement("link");
recipeStyles.rel = "stylesheet";
recipeStyles.href = "recipe.css";
document.head.append(recipeStyles);

function normalizeText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}

function setupRecipePicker() {
  const section = document.createElement("section");
  section.className = "recipe-picker panel";
  section.setAttribute("aria-labelledby", "recipe-title");
  section.innerHTML = `
    <div class="panel-heading recipe-heading">
      <div><p class="eyebrow">¿QUÉ COCINAMOS HOY?</p><h2 id="recipe-title">Encuentra tu receta</h2></div>
      <span class="recipe-icon" aria-hidden="true">♨</span>
    </div>
    <p class="recipe-intro">Busca por nombre y combina las opciones que te interesen.</p>
    <form id="recipe-form">
      <div class="recipe-filter-grid">
        <label class="recipe-field recipe-search-field" for="recipe-search">Nombre de la receta
          <input id="recipe-search" type="search" placeholder="Ej. tortilla, pasta…" autocomplete="off">
        </label>
        <label class="recipe-field" for="recipe-time">Tiempo de cocinado
          <select id="recipe-time" name="recipe-time">
            <option value="">Cualquier duración</option>
            <option value="under30">Menos de 30 mins</option>
            <option value="30to60">Entre 30 y 60 minutos</option>
            <option value="over60">Más de una hora</option>
          </select>
        </label>
        <label class="recipe-field" for="recipe-category">Tipo de receta
          <select id="recipe-category" name="recipe-category">
            <option value="">Todos los tipos</option>
            <option value="salado">Salado</option>
            <option value="guarnicion">Guarnición</option>
            <option value="postre">Postre</option>
          </select>
        </label>
      </div>
      <fieldset class="recipe-options">
        <legend>Otras características</legend>
        <label class="recipe-option"><input type="checkbox" name="recipe-filter" value="tupper"><span class="recipe-check" aria-hidden="true">✓</span><span>Perfecto para tupper</span></label>
        <label class="recipe-option"><input type="checkbox" name="recipe-filter" value="few-ingredients"><span class="recipe-check" aria-hidden="true">✓</span><span>Pocos ingredientes <small>6 o menos</small></span></label>
      </fieldset>
      <fieldset class="recipe-mode-options">
        <legend>¿Cómo quieres ver los resultados?</legend>
        <label class="recipe-mode-option"><input type="radio" name="recipe-mode" value="list" checked><span>Ver listado</span></label>
        <label class="recipe-mode-option"><input type="radio" name="recipe-mode" value="random"><span>Elegir una al azar</span></label>
      </fieldset>
      <div class="recipe-actions"><button class="button button-primary" type="submit">Buscar recetas <span aria-hidden="true">→</span></button><button id="clear-recipe-filters" class="recipe-clear" type="button">Quitar filtros</button></div>
      <p id="recipe-message" class="recipe-message" aria-live="polite"></p>
    </form>
    <div id="recipe-results" class="recipe-results" aria-live="polite"></div>
    <dialog id="recipe-dialog" class="recipe-dialog" aria-labelledby="recipe-dialog-title">
      <div class="recipe-dialog-header"><p class="eyebrow">PARA PONERSE EL DELANTAL</p><button class="recipe-dialog-close" type="button" aria-label="Cerrar detalles">×</button></div>
      <div id="recipe-dialog-content"></div>
    </dialog>
  `;

  const dashboard = document.querySelector("#inicio");
  dashboard.insertBefore(section, dashboard.querySelector(".content-grid"));

  const form = section.querySelector("#recipe-form");
  const results = section.querySelector("#recipe-results");
  const message = section.querySelector("#recipe-message");
  const dialog = section.querySelector("#recipe-dialog");
  const dialogContent = section.querySelector("#recipe-dialog-content");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = [...form.querySelectorAll('input[name="recipe-filter"]:checked')].map((input) => input.value);
    const nameQuery = normalizeText(section.querySelector("#recipe-search").value);
    const timeRange = section.querySelector("#recipe-time").value;
    const category = section.querySelector("#recipe-category").value;
    const mode = form.querySelector('input[name="recipe-mode"]:checked').value;
    results.replaceChildren();

    const matches = recipes.filter((recipe) => {
      if (nameQuery && !normalizeText(recipe.name).includes(nameQuery)) return false;
      if (category && recipe.category !== category) return false;
      if (selected.includes("tupper") && !recipe.tupper) return false;
      if (selected.includes("few-ingredients") && recipe.ingredients.length > 6) return false;
      if (timeRange === "under30" && recipe.minutes >= 30) return false;
      if (timeRange === "30to60" && (recipe.minutes < 30 || recipe.minutes > 60)) return false;
      if (timeRange === "over60" && recipe.minutes <= 60) return false;
      return true;
    });

    if (!matches.length) {
      message.textContent = "No hay recetas que coincidan. Prueba a cambiar o quitar algún criterio.";
      return;
    }

    if (mode === "random") {
      const chosenRecipe = matches[Math.floor(Math.random() * matches.length)];
      message.textContent = "Tu receta elegida al azar:";
      renderRecipe(chosenRecipe, results, openRecipeDetails);
      return;
    }

    message.textContent = `${matches.length} ${matches.length === 1 ? "receta encontrada" : "recetas encontradas"}. Pulsa una para ver sus detalles.`;
    matches.forEach((recipe) => renderRecipe(recipe, results, openRecipeDetails));
  });

  section.querySelector("#clear-recipe-filters").addEventListener("click", () => {
    form.reset();
    results.replaceChildren();
    message.textContent = "";
  });

  function openRecipeDetails(recipe) {
    dialogContent.replaceChildren();
    const title = document.createElement("h2");
    title.id = "recipe-dialog-title";
    title.textContent = recipe.name;
    const description = document.createElement("p");
    description.className = "recipe-dialog-description";
    description.textContent = recipe.description;
    const facts = document.createElement("p");
    facts.className = "recipe-dialog-facts";
    facts.textContent = `${recipe.minutes} min · ${recipe.servings} raciones · ${categoryLabel(recipe.category)}${recipe.tupper ? " · Apta para tupper" : ""}`;
    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = "Ingredientes";
    const ingredients = document.createElement("ul");
    ingredients.className = "recipe-ingredient-list";
    recipe.ingredients.forEach((ingredient) => {
      const item = document.createElement("li");
      item.textContent = ingredient;
      ingredients.append(item);
    });
    const instructionsHeading = document.createElement("h3");
    instructionsHeading.textContent = "Preparación";
    const instructions = document.createElement("p");
    instructions.className = "recipe-instructions";
    instructions.textContent = recipe.instructions;
    dialogContent.append(title, description, facts, ingredientsHeading, ingredients, instructionsHeading, instructions);
    dialog.showModal();
    section.querySelector(".recipe-dialog-close").focus();
  }

  section.querySelector(".recipe-dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function categoryLabel(category) {
  return ({ salado: "Salado", guarnicion: "Guarnición", postre: "Postre" })[category] || "Receta";
}

function renderRecipe(recipe, container, onSelect) {
  const card = document.createElement("button");
  card.className = "recipe-card";
  card.type = "button";
  card.setAttribute("aria-label", `Ver receta: ${recipe.name}`);
  const title = document.createElement("h3");
  title.textContent = recipe.name;
  const description = document.createElement("p");
  description.textContent = recipe.description;
  const details = document.createElement("div");
  details.className = "recipe-details";
  details.textContent = `${recipe.minutes} min · ${recipe.ingredients.length} ingredientes · ${categoryLabel(recipe.category)}${recipe.tupper ? " · Apta para tupper" : ""}`;
  const prompt = document.createElement("span");
  prompt.className = "recipe-card-prompt";
  prompt.textContent = "Ver ingredientes y preparación →";
  card.append(title, description, details, prompt);
  card.addEventListener("click", () => onSelect(recipe));
  container.append(card);
}

setupRecipePicker();
document.querySelector("#today").textContent = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
renderAll();

if (sessionStorage.getItem("casa-en-orden-unlocked") === "true") showApp();
else accessCode.focus();
