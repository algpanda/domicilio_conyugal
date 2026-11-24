// Añade los apartados Tip, Fuente y Fecha a la ventana de receta sin retirar el resto de detalles.
(() => {
  const extraStyles = document.createElement("style");
  extraStyles.textContent = `
    .recipe-extra-section { margin-top: 18px; }
    .recipe-extra-section h3 { margin: 0 0 8px; color: #344c3b; font-size: 14px; }
    .recipe-extra-section p { margin: 0; color: #505c51; font-size: 12px; line-height: 1.7; }
    .recipe-extra-section ul { display: grid; gap: 7px; margin: 0; padding-left: 19px; color: #505c51; font-size: 12px; line-height: 1.6; }
    .recipe-source-link { color: #58775f; overflow-wrap: anywhere; }
  `;
  document.head.append(extraStyles);

  function addExtraSection(content, title, value) {
    const section = document.createElement("section");
    section.className = "recipe-extra-section";
    const heading = document.createElement("h3");
    heading.textContent = title;
    section.append(heading);

    if (title === "Tips" && Array.isArray(value) && value.length) {
      const list = document.createElement("ul");
      value.forEach((tip) => {
        const item = document.createElement("li");
        item.textContent = tip;
        list.append(item);
      });
      section.append(list);
    } else {
      const text = document.createElement("p");
      const displayedValue = Array.isArray(value) ? value.join(" · ") : String(value || "Pendiente de indicar");
      if (title === "Fuente" && /^https?:\/\//i.test(displayedValue)) {
        const link = document.createElement("a");
        link.className = "recipe-source-link";
        link.href = displayedValue;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = displayedValue;
        text.append(link);
      } else {
        text.textContent = displayedValue;
      }
      section.append(text);
    }

    content.append(section);
  }

  function updateExtras() {
    const dialog = document.querySelector("#recipe-details-dialog");
    const content = document.querySelector("#recipe-dialog-content");
    if (!dialog?.open || !content) return;

    const title = content.querySelector("h2");
    if (!title) return;
    const recipeName = title.textContent;
    if (dialog.dataset.recipeExtrasAdded === recipeName) return;

    const recipe = (window.RECETAS || []).find((item) => item.name === recipeName);
    if (!recipe) return;

    addExtraSection(content, "Tips", recipe.tips);
    addExtraSection(content, "Fuente", recipe.fuente);
    addExtraSection(content, "Fecha", recipe.fecha);
    dialog.dataset.recipeExtrasAdded = recipeName;
  }

  const observer = new MutationObserver(updateExtras);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("#recipe-details-dialog");
    dialog?.addEventListener("close", (event) => delete event.currentTarget.dataset.recipeExtrasAdded);
  });
})();
