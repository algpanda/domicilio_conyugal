// Muestra los metadatos de cada receta como burbujas en tarjetas y ventana de detalles.
(() => {
  const styles = document.createElement("style");
  styles.textContent = `
    .recipe-metadata-badges { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 9px; }
    .recipe-metadata-badge { display: inline-flex; min-height: 26px; padding: 5px 9px; align-items: center; color: #536b55; border-radius: 999px; background: #edf1e8; font-size: 11px; line-height: 1.2; }
    .recipe-card .recipe-metadata-badges { gap: 5px; margin-bottom: 7px; }
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
      if (card.querySelector(":scope > .recipe-card-copy > .recipe-metadata-badges, :scope > .recipe-metadata-badges")) return;
      const title = card.querySelector("h3");
      const name = title?.textContent;
      const recipe = (window.RECETAS || []).find((item) => item.name === name);
      if (!title || !recipe) return;
      const badges = recipeBadges(recipe);
      badges.classList.add("recipe-card-metadata");
      title.before(badges);
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
