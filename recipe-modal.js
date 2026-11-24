// Da formato a los detalles de la receta, incluida la preparación en pasos.
(() => {
  const styles = document.createElement("style");
  styles.textContent = `
    #recipe-details-dialog .recipe-dialog-facts { display: none; }
    #recipe-details-dialog > .recipe-dialog-header > .eyebrow { display: block; color: #8a947e; font-size: 10px; font-weight: 700; letter-spacing: .16em; }
    #recipe-details-dialog .recipe-dialog-header { justify-content: space-between; }
    .recipe-detail-layout { display: block; margin-top: 16px; }
    .recipe-detail-ingredients { display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 16px; align-items: center; padding: 16px 18px; border-radius: 12px; background: #f0f3eb; }
    .recipe-detail-ingredients h3 { grid-column: 1 / -1; margin: 0; color: #344c3b; font-size: 14px; }
    .recipe-detail-ingredients ul, .recipe-detail-preparation ul { display: grid; gap: 7px; margin: 0; padding-left: 19px; color: #505c51; font-size: 12px; line-height: 1.6; }
    .recipe-detail-image { display: block; width: 120px; height: 120px; aspect-ratio: 1; object-fit: cover; border-radius: 10px; background: #e5eadf; }
    .recipe-detail-preparation { margin-top: 20px; }
    .recipe-detail-preparation h3 { margin: 0 0 10px; color: #344c3b; font-size: 14px; }
    @media (max-width: 520px) {
      .recipe-detail-ingredients { grid-template-columns: minmax(0, 1fr) 96px; gap: 10px; padding: 13px; }
      .recipe-detail-image { width: 96px; height: 96px; }
    }
  `;
  document.head.append(styles);

  const placeholder = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
      <rect width="240" height="180" rx="20" fill="#eef1e8"/>
      <circle cx="120" cy="80" r="43" fill="#fffefa"/>
      <path d="M77 81c12-25 34-32 44-32 18 0 36 11 43 32-14 3-27 15-43 15-15 0-28-12-44-15Z" fill="#8da18a"/>
      <path d="M88 103c17 10 46 12 65 0" fill="none" stroke="#c89b66" stroke-width="6" stroke-linecap="round"/>
      <text x="120" y="151" text-anchor="middle" fill="#788273" font-family="sans-serif" font-size="13">Tu foto aquí</text>
    </svg>
  `)}`;

  function preparationSteps(instructions, fallback) {
    const source = Array.isArray(instructions) ? instructions : [instructions || fallback];
    return source
      .flatMap((step) => String(step).split(/\n+/))
      .flatMap((step) => step.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/u))
      .map((step) => step.trim())
      .filter(Boolean);
  }

  function removeIngredientCounts() {
    document.querySelectorAll(".recipe-card .recipe-details").forEach((details) => {
      const withoutCount = details.textContent.replace(/^\s*\d+\s+ingredientes\s*·\s*/i, "");
      if (withoutCount !== details.textContent) details.textContent = withoutCount;
    });
  }

  function updateRecipeDialog() {
    removeIngredientCounts();
    const dialog = document.querySelector("#recipe-details-dialog");
    const content = document.querySelector("#recipe-dialog-content");
    if (!dialog?.open || !content) return;

    const title = content.querySelector("h2");
    if (!title || dialog.dataset.formattedRecipe === title.textContent) return;
    const recipeName = title.textContent;
    const recipe = (window.RECETAS || []).find((item) => item.name === recipeName);
    if (!recipe) return;

    const tagline = dialog.querySelector(".recipe-dialog-header .eyebrow");
    if (tagline) tagline.textContent = "Chulapa y Chuleta";
    const description = content.querySelector(".recipe-dialog-description");
    const ingredientsHeading = [...content.querySelectorAll("h3")].find((heading) => heading.textContent === "Ingredientes");
    const ingredients = content.querySelector(".recipe-ingredient-list");
    const instructionsHeading = [...content.querySelectorAll("h3")].find((heading) => heading.textContent === "Preparación");
    const instructions = content.querySelector(".recipe-instructions");

    const card = [...document.querySelectorAll(".recipe-card")]
      .find((item) => item.querySelector("h3")?.textContent === recipeName);
    const cardImage = card?.querySelector(".recipe-card-image");

    const layout = document.createElement("div");
    layout.className = "recipe-detail-layout";
    const ingredientsPanel = document.createElement("section");
    ingredientsPanel.className = "recipe-detail-ingredients";
    if (ingredientsHeading) ingredientsPanel.append(ingredientsHeading);
    if (ingredients) ingredientsPanel.append(ingredients);

    const image = document.createElement("img");
    image.className = "recipe-detail-image";
    image.alt = `Imagen de ${recipeName}`;
    image.src = cardImage?.currentSrc || cardImage?.src || recipe.imageUrl || placeholder;
    image.addEventListener("error", () => { image.src = placeholder; }, { once: true });
    ingredientsPanel.append(image);
    layout.append(ingredientsPanel);

    const preparation = document.createElement("section");
    preparation.className = "recipe-detail-preparation";
    if (instructionsHeading) preparation.append(instructionsHeading);
    const steps = preparationSteps(recipe.instructions, instructions?.textContent || "Consulta la receta para conocer la preparación.");
    const stepList = document.createElement("ul");
    stepList.className = "recipe-instructions";
    steps.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      stepList.append(item);
    });
    preparation.append(stepList);

    content.replaceChildren(title);
    if (description) content.append(description);
    content.append(layout, preparation);
    dialog.dataset.formattedRecipe = recipeName;
  }

  const observer = new MutationObserver(updateRecipeDialog);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("#recipe-details-dialog");
    dialog?.addEventListener("close", () => { delete dialog.dataset.formattedRecipe; });
  });
})();
