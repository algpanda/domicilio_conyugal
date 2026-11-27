import { addDoc, collection } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const fields = [
  ["name", "Nombre de la receta", "text", true],
  ["description", "Descripción", "textarea"],
  ["tipo", "Tipo", "text"],
  ["region", "Región", "text"],
  ["tiempoMinutos", "Tiempo de preparación", "select"],
  ["novedad", "¿Es una novedad?", "novelty"],
  ["etiquetas", "Etiquetas (una por línea)", "list"],
  ["materiasPrimas", "Materias primas (una por línea)", "list"],
  ["imageUrl", "URL de la imagen", "url"],
  ["ingredients", "Ingredientes (uno por línea)", "list", true],
  ["instructions", "Preparación: un paso por línea", "list", true],
  ["tips", "Consejos (uno por línea)", "list"],
  ["fuente", "Fuente", "text"],
  ["fecha", "Fecha", "text"],
  ["servings", "Raciones", "number"]
];

function addStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .recipe-admin { margin-top: 18px; }
    .recipe-admin-toggle { display: flex; width: 100%; align-items: center; justify-content: space-between; text-align: left; }
    .recipe-admin-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 18px; }
    .recipe-admin-field { display: grid; gap: 6px; color: #536354; font-size: 12px; font-weight: 600; }
    .recipe-admin-field.full { grid-column: 1 / -1; }
    .recipe-admin-field input, .recipe-admin-field textarea, .recipe-admin-field select { width: 100%; min-height: 42px; padding: 10px 12px; color: #263d32; border: 1px solid #dedfd5; border-radius: 9px; background: #fffefa; font: inherit; font-weight: 400; }
    .recipe-admin-field textarea { min-height: 92px; resize: vertical; }
    .recipe-admin-field input:focus, .recipe-admin-field textarea:focus, .recipe-admin-field select:focus { outline: 2px solid #7d9a7e; outline-offset: 1px; }
    .recipe-admin-help, .recipe-admin-status { grid-column: 1 / -1; margin: 0; color: #7b827a; font-size: 12px; line-height: 1.6; }
    .recipe-admin-status[data-state="error"] { color: #b44545; }
    .recipe-admin-status[data-state="success"] { color: #426a49; }
    @media (max-width: 600px) { .recipe-admin-form { grid-template-columns: 1fr; } .recipe-admin-field.full, .recipe-admin-help, .recipe-admin-status { grid-column: 1; } }
  `;
  document.head.append(style);
}

function createField([name, label, type, required = false]) {
  const wrapper = document.createElement("label");
  wrapper.className = `recipe-admin-field${["textarea", "list"].includes(type) ? " full" : ""}`;
  wrapper.htmlFor = `recipe-admin-${name}`;
  wrapper.append(document.createTextNode(label));
  let input;
  if (type === "textarea" || type === "list") {
    input = document.createElement("textarea");
    if (type === "list") input.placeholder = "Escribe un elemento por línea";
  } else if (type === "select" || type === "novelty") {
    input = document.createElement("select");
    const options = type === "select"
      ? [["<30 minutos", "<30 minutos"], ["entre 30 - 60 minutos", "entre 30 - 60 minutos"], [">1 hora", ">1 hora"], [">1 día", ">1 día"]]
      : [["No", "No"], ["Sí", "Sí"]];
    options.forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      input.append(option);
    });
  } else {
    input = document.createElement("input");
    input.type = type;
    if (type === "number") input.min = "1";
    if (type === "url") input.placeholder = "https://…";
  }
  input.id = `recipe-admin-${name}`;
  input.name = name;
  input.required = required;
  wrapper.append(input);
  return wrapper;
}

function setupRecipeAdmin() {
  const dashboard = document.querySelector("#inicio");
  if (!dashboard || !window.FIREBASE_DB) return;
  addStyles();

  const section = document.createElement("section");
  section.className = "recipe-admin panel";
  section.setAttribute("aria-labelledby", "recipe-admin-title");
  const heading = document.createElement("div");
  heading.className = "panel-heading";
  const titleGroup = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "AMPLÍA TU RECETARIO";
  const title = document.createElement("h2");
  title.id = "recipe-admin-title";
  title.textContent = "Añadir una receta";
  titleGroup.append(eyebrow, title);
  heading.append(titleGroup);

  const form = document.createElement("form");
  form.className = "recipe-admin-form";
  form.hidden = true;
  fields.forEach((field) => form.append(createField(field)));
  const help = document.createElement("p");
  help.className = "recipe-admin-help";
  help.textContent = "Los campos de texto aceptan listas separadas por líneas. La receta se guardará en la colección «recetas» de Firestore. Para que el envío funcione, las reglas de Firestore deben permitirlo solo a usuarios autorizados; no habilites escrituras públicas.";
  const status = document.createElement("p");
  status.className = "recipe-admin-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const actions = document.createElement("div");
  actions.className = "recipe-admin-field full";
  const submit = document.createElement("button");
  submit.className = "button button-primary";
  submit.type = "submit";
  submit.textContent = "Guardar receta en Firebase";
  actions.append(submit);
  form.append(help, status, actions);

  const toggle = document.createElement("button");
  toggle.className = "button button-primary recipe-admin-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "Abrir formulario  ＋";
  toggle.addEventListener("click", () => {
    form.hidden = !form.hidden;
    toggle.setAttribute("aria-expanded", String(!form.hidden));
    toggle.textContent = form.hidden ? "Abrir formulario  ＋" : "Cerrar formulario  −";
    if (!form.hidden) form.querySelector("input")?.focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const recipe = {};
    fields.forEach(([name, , type]) => {
      const value = form.elements.namedItem(name).value.trim();
      if (type === "list") recipe[name] = value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
      else if (type === "number") {
        if (value) recipe[name] = Number(value);
      } else recipe[name] = value;
    });

    submit.disabled = true;
    status.dataset.state = "";
    status.textContent = "Guardando receta…";
    try {
      const saved = await addDoc(collection(window.FIREBASE_DB, "recetas"), recipe);
      window.RECETAS = [...(window.RECETAS || []), { id: saved.id, ...recipe }];
      status.dataset.state = "success";
      status.textContent = `Receta «${recipe.name}» guardada correctamente en Firebase.`;
      form.reset();
    } catch (error) {
      console.error("No se pudo guardar la receta:", error);
      status.dataset.state = "error";
      status.textContent = "No se pudo guardar. Comprueba la conexión y las reglas de Firestore (PERMISSION_DENIED indica que la escritura no está autorizada).";
    } finally {
      submit.disabled = false;
    }
  });

  section.append(heading, toggle, form);
  dashboard.insertBefore(section, dashboard.querySelector(".footer-note"));
}

setupRecipeAdmin();
