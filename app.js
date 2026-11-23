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

// Catálogo local de recetas: estos datos sirven como base de datos inicial para los filtros.
const recipes = [
  { name: "Ensalada de garbanzos", description: "Fresca, saciante y lista en un momento.", minutes: 15, ingredients: 5, tupper: true },
  { name: "Pasta con tomate y atún", description: "Un clásico fácil con ingredientes de despensa.", minutes: 20, ingredients: 5, tupper: true },
  { name: "Tortilla de calabacín", description: "Perfecta templada o fría para llevar.", minutes: 25, ingredients: 4, tupper: true },
  { name: "Arroz salteado con verduras", description: "Aprovecha las verduras que tengas en la nevera.", minutes: 25, ingredients: 6, tupper: true },
  { name: "Quesadillas de queso y frijoles", description: "Doradas por fuera y listas en pocos minutos.", minutes: 15, ingredients: 5, tupper: false },
  { name: "Crema rápida de calabaza", description: "Suave y reconfortante, con pocos ingredientes.", minutes: 25, ingredients: 5, tupper: true },
  { name: "Tostadas de aguacate y huevo", description: "Una cena sencilla que se prepara al momento.", minutes: 10, ingredients: 4, tupper: false },
  { name: "Pollo al limón con cuscús", description: "Un plato completo que aguanta muy bien en tupper.", minutes: 25, ingredients: 6, tupper: true },
  { name: "Bowl de quinoa y verduras", description: "Colorido, nutritivo y fácil de dejar preparado.", minutes: 30, ingredients: 7, tupper: true },
  { name: "Lentejas exprés", description: "Una versión rápida de un plato de cuchara casero.", minutes: 20, ingredients: 6, tupper: true }
];

const recipeStyles = document.createElement("link");
recipeStyles.rel = "stylesheet";
recipeStyles.href = "recipe.css";
document.head.append(recipeStyles);

function setupRecipePicker() {
  const section = document.createElement("section");
  section.className = "recipe-picker panel";
  section.setAttribute("aria-labelledby", "recipe-title");
  section.innerHTML = `
    <div class="panel-heading recipe-heading">
      <div><p class="eyebrow">¿QUÉ COCINAMOS HOY?</p><h2 id="recipe-title">Encuentra tu receta</h2></div>
      <span class="recipe-icon" aria-hidden="true">♨</span>
    </div>
    <p class="recipe-intro">Elige todas las opciones que te interesen y buscaremos recetas que cumplan con ellas.</p>
    <form id="recipe-form">
      <fieldset class="recipe-options">
        <legend class="sr-only">Características de la receta</legend>
        <label class="recipe-option"><input type="checkbox" name="recipe-filter" value="tupper"><span class="recipe-check" aria-hidden="true">✓</span><span>Perfecto para tupper</span></label>
        <label class="recipe-option"><input type="checkbox" name="recipe-filter" value="quick"><span class="recipe-check" aria-hidden="true">✓</span><span>Rápido de cocinar <small>25 min o menos</small></span></label>
        <label class="recipe-option"><input type="checkbox" name="recipe-filter" value="few-ingredients"><span class="recipe-check" aria-hidden="true">✓</span><span>Pocos ingredientes <small>6 o menos</small></span></label>
      </fieldset>
      <div class="recipe-actions"><button class="button button-primary" type="submit">Buscar recetas <span aria-hidden="true">→</span></button><button id="clear-recipe-filters" class="recipe-clear" type="button">Quitar filtros</button></div>
      <p id="recipe-message" class="recipe-message" aria-live="polite"></p>
    </form>
    <div id="recipe-results" class="recipe-results" aria-live="polite"></div>
  `;

  const dashboard = document.querySelector("#inicio");
  dashboard.insertBefore(section, dashboard.querySelector(".content-grid"));

  const form = section.querySelector("#recipe-form");
  const results = section.querySelector("#recipe-results");
  const message = section.querySelector("#recipe-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = [...form.querySelectorAll('input[name="recipe-filter"]:checked')].map((input) => input.value);
    results.replaceChildren();

    if (!selected.length) {
      message.textContent = "Marca al menos una opción para encontrar tu receta.";
      form.querySelector('input[name="recipe-filter"]').focus();
      return;
    }

    const matches = recipes.filter((recipe) => selected.every((filter) => {
      if (filter === "tupper") return recipe.tupper;
      if (filter === "quick") return recipe.minutes <= 25;
      if (filter === "few-ingredients") return recipe.ingredients <= 6;
      return false;
    }));

    if (!matches.length) {
      message.textContent = "No hay recetas que cumplan todas esas opciones. Prueba a quitar algún filtro.";
      return;
    }

    message.textContent = `${matches.length} ${matches.length === 1 ? "receta encontrada" : "recetas encontradas"} para ti`;
    matches.forEach((recipe) => {
      const card = document.createElement("article");
      card.className = "recipe-card";
      const title = document.createElement("h3");
      title.textContent = recipe.name;
      const description = document.createElement("p");
      description.textContent = recipe.description;
      const details = document.createElement("div");
      details.className = "recipe-details";
      details.textContent = `◷ ${recipe.minutes} min  ·  ♧ ${recipe.ingredients} ingredientes${recipe.tupper ? "  ·  ✓ Apta para tupper" : ""}`;
      card.append(title, description, details);
      results.append(card);
    });
  });

  section.querySelector("#clear-recipe-filters").addEventListener("click", () => {
    form.reset();
    results.replaceChildren();
    message.textContent = "";
  });
}

setupRecipePicker();
document.querySelector("#today").textContent = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
renderAll();

if (sessionStorage.getItem("casa-en-orden-unlocked") === "true") showApp();
else accessCode.focus();
