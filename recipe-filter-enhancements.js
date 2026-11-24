// Mejora el comportamiento de los filtros de recetas sin alterar sus criterios de búsqueda.
(() => {
  const filterDialog = document.querySelector("#recipe-filter-dialog");
  const filterForm = document.querySelector("#recipe-filter-form");
  const recipeForm = document.querySelector("#recipe-form");
  if (!filterDialog || !filterForm || !recipeForm) return;

  const multiSelects = [...filterDialog.querySelectorAll(".recipe-multi-select")];

  function updateSummary(details) {
    const summary = details.querySelector("summary");
    if (!summary) return;
    const label = summary.getAttribute("aria-label")?.replace(/, desplegar opciones$/, "") || "Elegir opciones";
    const chosen = [...details.querySelectorAll('input[type="checkbox"]:checked')].map((input) => {
      return input.closest("label")?.querySelector("span")?.textContent.trim() || input.value;
    });
    summary.textContent = chosen.length ? chosen.join(", ") : label;
    summary.setAttribute("aria-label", chosen.length
      ? `${label}: ${chosen.join(", ")}. Desplegar opciones`
      : `${label}, desplegar opciones`);
  }

  multiSelects.forEach((details) => {
    details.addEventListener("change", (event) => {
      if (event.target.matches('input[type="checkbox"]')) updateSummary(details);
    });
    details.addEventListener("toggle", () => {
      if (details.open) multiSelects.forEach((other) => { if (other !== details) other.open = false; });
      updateSummary(details);
    });
    updateSummary(details);
  });

  // Cierra los desplegables al pulsar fuera; al abrir uno, pliega los demás.
  document.addEventListener("pointerdown", (event) => {
    const clickedSelect = event.target.closest?.(".recipe-multi-select");
    multiSelects.forEach((details) => {
      if (details.open && details !== clickedSelect) details.open = false;
    });
  });

  // Los criterios dentro de un mismo grupo siguen siendo OR, y la búsqueda existente
  // combina cada grupo con AND. Reutiliza el submit normal para aplicar los filtros.
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    recipeForm.requestSubmit();
  }, true);

  // En esta ventana solo la X la cierra; aplicar filtros, Escape o el backdrop no.
  filterDialog.addEventListener("cancel", (event) => event.preventDefault());
  filterDialog.addEventListener("click", (event) => {
    if (event.target === filterDialog) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();
