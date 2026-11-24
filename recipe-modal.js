// Da formato a los detalles de la receta, sus datos editoriales y la ampliación de imagen.
(() => {
  const styles = document.createElement("style");
  styles.textContent = `
    #recipe-details-dialog .recipe-dialog-facts { display: none; }
    #recipe-details-dialog > .recipe-dialog-header > .eyebrow { display: block; color: #8a947e; font-size: 10px; font-weight: 700; letter-spacing: .16em; }
    #recipe-details-dialog .recipe-dialog-header { justify-content: space-between; }
    .recipe-detail-layout { display: block; margin-top: 16px; }
    .recipe-detail-ingredients { display: grid; grid-template-columns: minmax(0, 1fr) 120px; grid-template-rows: auto 1fr; gap: 12px 16px; align-items: start; padding: 16px 18px; border-radius: 12px; background: #f0f3eb; }
    .recipe-detail-ingredients h3 { grid-column: 1; grid-row: 1; align-self: center; margin: 0; color: #344c3b; font-size: 14px; }
    .recipe-ingredient-list { grid-column: 1; grid-row: 2; }
    .recipe-image-zoom { grid-column: 2; grid-row: 1 / span 2; display: block; width: 120px; height: 120px; padding: 0; overflow: hidden; border: 0; border-radius: 10px; background: #e5eadf; cursor: zoom-in; }
    .recipe-detail-image { display: block; width: 100%; height: 100%; aspect-ratio: 1; object-fit: cover; }
    .recipe-image-zoom:focus-visible { outline: 3px solid #7d9a7e; outline-offset: 3px; }
    .recipe-detail-ingredients ul, .recipe-detail-preparation ul, .recipe-extra-section ul { display: grid; gap: 7px; margin: 0; padding-left: 19px; color: #505c51; font-size: 12px; line-height: 1.6; }
    .recipe-detail-preparation { margin-top: 20px; }
    .recipe-detail-preparation h3 { margin: 0 0 10px; color: #344c3b; font-size: 14px; }
    .recipe-extra-section { margin-top: 18px; padding: 15px 17px; border-radius: 12px; background: #f0f3eb; }
    .recipe-extra-section h3 { margin: 0 0 8px; color: #344c3b; font-size: 14px; }
    .recipe-extra-section p { margin: 0; color: #505c51; font-size: 12px; line-height: 1.7; overflow-wrap: anywhere; }
    .recipe-extra-section ul { padding-left: 19px; }
    .recipe-source-link { color: #58775f; overflow-wrap: anywhere; }
    .recipe-metadata { display: grid; gap: 12px; margin-top: 14px; }
    .recipe-metadata-item { display: grid; gap: 4px; }
    .recipe-metadata-label { color: #697768; font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .recipe-image-dialog { width: min(900px, calc(100% - 28px)); max-width: none; max-height: 90vh; padding: 14px; border: 1px solid #eeece4; border-radius: 16px; background: #fffefa; }
    .recipe-image-dialog::backdrop { background: #1d2c24cc; backdrop-filter: blur(3px); }
    .recipe-image-dialog-header { display: flex; justify-content: flex-end; margin-bottom: 8px; }
    .recipe-image-dialog-content { display: grid; min-height: 120px; place-items: center; }
    .recipe-image-dialog-content img { display: block; max-width: 100%; max-height: calc(90vh - 70px); object-fit: contain; border-radius: 9px; }
    @media (max-width: 520px) {
      .recipe-detail-ingredients { grid-template-columns: minmax(0, 1fr) 88px; gap: 10px; padding: 13px; }
      .recipe-image-zoom { width: 88px; height: 88px; }
      .recipe-extra-section { padding: 13px; }
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

  function ensureImageDialog() {
    let imageDialog = document.querySelector("#recipe-image-dialog");
    if (imageDialog) return imageDialog;

    imageDialog = document.createElement("dialog");
    imageDialog.id = "recipe-image-dialog";
    imageDialog.className = "recipe-image-dialog";
    imageDialog.setAttribute("aria-label", "Imagen ampliada de la receta");
    imageDialog.innerHTML = `
      <div class="recipe-image-dialog-header">
        <button class="recipe-dialog-close recipe-image-dialog-close" type="button" aria-label="Cerrar imagen ampliada">×</button>
      </div>
      <div class="recipe-image-dialog-content"></div>
    `;
    document.body.append(imageDialog);
    imageDialog.querySelector(".recipe-image-dialog-close").addEventListener("click", () => imageDialog.close());
    imageDialog.addEventListener("click", (event) => {
      if (event.target === imageDialog) imageDialog.close();
    });
    imageDialog.addEventListener("close", () => imageDialog.querySelector(".recipe-image-dialog-content").replaceChildren());
    return imageDialog;
  }

  function addExtraSection(content, headingText, value) {
    const section = document.createElement("section");
    section.className = "recipe-extra-section";
    const heading = document.createElement("h3");
    heading.textContent = headingText;
    section.append(heading);

    if (headingText === "Tips" && Array.isArray(value) && value.length) {
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
      if (headingText === "Fuente" && /^https?:\/\//i.test(displayedValue)) {
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
    return section;
  }

  function removeIngredientCounts() {
    document.querySelectorAll(".recipe-card .recipe-details").forEach((details) => {
      const originalText = details.textContent;
      const cleanedText = originalText.replace(/^\s*\d+\s+ingredientes\s*·\s*/i, "");
      if (cleanedText !== originalText) details.textContent = cleanedText;
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

    const imageButton = document.createElement("button");
    imageButton.className = "recipe-image-zoom";
    imageButton.type = "button";
    imageButton.setAttribute("aria-label", `Ampliar imagen de ${recipeName}`);
    const image = document.createElement("img");
    image.className = "recipe-detail-image";
    image.alt = `Imagen de ${recipeName}`;
    image.src = cardImage?.currentSrc || cardImage?.src || recipe.imageUrl || placeholder;
    image.addEventListener("error", () => { image.src = placeholder; }, { once: true });
    imageButton.append(image);
    imageButton.addEventListener("click", () => {
      const imageDialog = ensureImageDialog();
      const enlarged = document.createElement("img");
      enlarged.src = image.currentSrc || image.src;
      enlarged.alt = `Imagen ampliada de ${recipeName}`;
      imageDialog.querySelector(".recipe-image-dialog-content").replaceChildren(enlarged);
      imageDialog.showModal();
      imageDialog.querySelector(".recipe-image-dialog-close").focus();
    });
    ingredientsPanel.append(imageButton);
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

    const metadata = document.createElement("section");
    metadata.className = "recipe-metadata";
    const sourceSection = addExtraSection(metadata, "Fuente", recipe.fuente);
    sourceSection.classList.add("recipe-metadata-item");
    const dateSection = addExtraSection(metadata, "Fecha", recipe.fecha);
    dateSection.classList.add("recipe-metadata-item");

    content.replaceChildren(title);
    if (description) content.append(description);
    content.append(layout, preparation);
    addExtraSection(content, "Tips", recipe.tips);
    content.append(metadata);
    dialog.dataset.formattedRecipe = recipeName;
  }

  const observer = new MutationObserver(updateRecipeDialog);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#recipe-details-dialog")?.addEventListener("close", (event) => {
      delete event.currentTarget.dataset.formattedRecipe;
    });
  });
})();
