// Ajusta la ventana de detalles de receta con una presentación visual común.
(() => {
  const styles = document.createElement("style");
  styles.textContent = `
    #recipe-details-dialog > .recipe-dialog-header > .eyebrow,
    #recipe-details-dialog .recipe-dialog-facts { display: none; }
    #recipe-details-dialog .recipe-dialog-header { justify-content: flex-end; }
    .recipe-detail-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(150px, .8fr); gap: 16px; align-items: stretch; margin-top: 16px; }
    .recipe-detail-ingredients { padding: 16px 18px; border-radius: 12px; background: #f0f3eb; }
    .recipe-detail-ingredients h3, .recipe-detail-preparation h3 { margin: 0 0 10px; color: #344c3b; font-size: 14px; }
    .recipe-detail-ingredients ul { display: grid; gap: 7px; margin: 0; padding-left: 19px; color: #505c51; font-size: 12px; line-height: 1.5; }
    .recipe-detail-image { width: 100%; height: 100%; min-height: 180px; max-height: 300px; object-fit: cover; border-radius: 12px; background: #eef1e8; }
    .recipe-detail-preparation { margin-top: 20px; }
    .recipe-detail-preparation p { margin: 0; color: #505c51; font-size: 12px; line-height: 1.7; }
    @media (max-width: 520px) {
      .recipe-detail-layout { grid-template-columns: minmax(0, 1fr) minmax(100px, .65fr); gap: 10px; }
      .recipe-detail-ingredients { padding: 13px; }
      .recipe-detail-image { min-height: 145px; }
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

  function updateRecipeDialog() {
    const dialog = document.querySelector("#recipe-details-dialog");
    const content = document.querySelector("#recipe-dialog-content");
    if (!dialog?.open || !content) return;

    const title = content.querySelector("h2");
    if (!title || dialog.dataset.formattedRecipe === title.textContent) return;
    const recipeName = title.textContent;
    const recipe = (window.RECETAS || []).find((item) => item.name === recipeName);
    if (!recipe) return;

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
    layout.append(ingredientsPanel, image);

    const preparation = document.createElement("section");
    preparation.className = "recipe-detail-preparation";
    if (instructionsHeading) preparation.append(instructionsHeading);
    if (instructions) preparation.append(instructions);

    content.replaceChildren(title);
    if (description) content.append(description);
    content.append(layout, preparation);
    dialog.dataset.formattedRecipe = recipeName;
  }

  const observer = new MutationObserver(updateRecipeDialog);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
