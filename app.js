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

document.querySelector("#today").textContent = new Intl.DateTimeFormat("es", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
renderAll();

if (sessionStorage.getItem("casa-en-orden-unlocked") === "true") showApp();
else accessCode.focus();
