// Muestra los metadatos de cada receta como burbujas en tarjetas y ventana de detalles.
(() => {
  const styles = document.createElement("style");
  styles.textContent = `
    .recipe-metadata-badges { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 9px; }
    .recipe-metadata-badge { display: inline-flex; min-height: 26px; padding: 5px 9px; align-items: center; color: #536b55; border-radius: 999px; background: #edf1e8; font-size: 11px; line-height: 1.2; }
    .recipe-card .recipe-metadata-badges { gap: 5px; margin: 0 0 7px; }
    .recipe-card .recipe-metadata-badge { min-height: 23px; padding: 4px 7px; font-size: 9px; }
    #recipe-dialog-content > .recipe-metadata-badges { margin: 8px 0 10px; }
  `;
  document.head.append(styles);

  function valuesOf(value) {
    const values = Array.isArray(value) ? value : [value];
    return values.map((item) => String(item ?? "").trim()).filter(Boolean);
  }

  function recipeBadges(recipe) {
    const items = [
      ...valuesOf(recipe.tipo || recipe.category),
      ...valuesOf(recipe.region),
      ...valuesOf(recipe.duracion || recipe.tiempoMinutos),
      ...valuesOf(recipe.etiquetas),
      ...valuesOf(recipe.materiasPrimas)
    ];
    const container = document.createElement("div");
    container.className = "recipe-metadata-badges";
    container.setAttribute("aria-label", "Tipo, región, tiempo, etiquetas y materias primas");
    items.forEach((value) => {
      const badge = document.createElement("span");
      badge.className = "recipe-metadata-badge";
      badge.textContent = value;
      container.append(badge);
    });
    return container;
  }

  function addCardBadges() {
    document.querySelectorAll(".recipe-card").forEach((card) => {
      const title = card.querySelector("h3");
      const prompt = card.querySelector(".recipe-card-prompt");
      const recipe = (window.RECETAS || []).find((item) => item.name === title?.textContent);
      if (!title || !prompt || !recipe) return;

      // Las etiquetas ya están en el conjunto de metadatos; quita la fila antigua para evitar duplicados.
      card.querySelectorAll(".recipe-card-tags").forEach((tags) => tags.remove());
      const badgeContainers = [...card.querySelectorAll(".recipe-metadata-badges")];
      const badges = badgeContainers.shift() || recipeBadges(recipe);
      badgeContainers.forEach((duplicate) => duplicate.remove());
      badges.classList.add("recipe-card-metadata");

      // No mover el nodo si ya está en su sitio: el MutationObserver observa el DOM completo.
      if (badges.parentNode !== prompt.parentNode || badges.nextElementSibling !== prompt) {
        prompt.parentNode.insertBefore(badges, prompt);
      }
    });
  }

  function addDialogBadges() {
    const content = document.querySelector("#recipe-dialog-content");
    const title = content?.querySelector("h2");
    if (!title || content.querySelector(":scope > .recipe-metadata-badges")) return;
    const recipe = (window.RECETAS || []).find((item) => item.name === title.textContent);
    if (recipe) title.before(recipeBadges(recipe));
  }

  function reorderModeButtons() {
    const actions = document.querySelector("#recipe-form .recipe-actions");
    if (!actions) return;
    const buttons = [...actions.querySelectorAll("button")];
    const listButton = buttons.find((button) => button.textContent.trim() === "Ver listado");
    const randomButton = buttons.find((button) => button.textContent.trim() === "Elegir una al azar");
    if (listButton && randomButton && listButton.compareDocumentPosition(randomButton) & Node.DOCUMENT_POSITION_FOLLOWING) return;
    if (listButton && randomButton) actions.insertBefore(listButton, randomButton);
  }

  function update() {
    addCardBadges();
    addDialogBadges();
    reorderModeButtons();
  }

  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  update();
})();
