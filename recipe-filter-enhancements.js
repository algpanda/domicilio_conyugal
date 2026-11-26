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

  // Guarda una instantánea de los filtros aplicados, sin buscar todavía.
  function readFilters() {
    const values = new Map();
    new FormData(filterForm).forEach((value, name) => {
      if (!values.has(name)) values.set(name, []);
      values.get(name).push(value);
    });
    return values;
  }

  function restoreFilters(values) {
    [...filterForm.elements].forEach((control) => {
      if (!control.name) return;
      const selected = values.get(control.name) || [];
      if (control.type === "checkbox" || control.type === "radio") {
        control.checked = selected.includes(control.value);
      } else {
        control.value = selected[0] || "";
      }
    });
    multiSelects.forEach(updateSummary);
  }

  let appliedFilters = readFilters();
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    appliedFilters = readFilters();
    filterDialog.close();
    recipeForm.querySelector("#recipe-results")?.replaceChildren();
    const pagination = recipeForm.querySelector("#recipe-pagination");
    if (pagination) {
      pagination.replaceChildren();
      pagination.hidden = true;
    }
    const message = recipeForm.querySelector("#recipe-message");
    if (message) message.textContent = "";
  }, true);

  // Cambiar filtros sin aplicarlos no debe alterar la búsqueda. Solo los botones de modo buscan.
  const modeFieldset = recipeForm.querySelector(".recipe-mode-options");
  const listMode = modeFieldset?.querySelector('input[value="list"]');
  const randomMode = modeFieldset?.querySelector('input[value="random"]');
  if (modeFieldset && listMode && randomMode) {
    modeFieldset.hidden = true;
    const actions = recipeForm.querySelector(".recipe-actions");
    actions?.querySelector('button[type="submit"]')?.remove();

    let searchAllowed = false;
    recipeForm.addEventListener("submit", (event) => {
      if (searchAllowed) {
        searchAllowed = false;
        restoreFilters(appliedFilters);
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);

    [
      { label: "Ver listado", mode: listMode },
      { label: "Elegir una al azar", mode: randomMode }
    ].forEach(({ label, mode }) => {
      const button = document.createElement("button");
      button.className = "button button-primary";
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => {
        restoreFilters(appliedFilters);
        mode.checked = true;
        searchAllowed = true;
        recipeForm.requestSubmit();
      });
      actions?.prepend(button);
    });
  }

  // Reiniciar criterios también reinicia la instantánea que se usará en la próxima búsqueda.
  recipeForm.querySelector("#clear-recipe-filters")?.addEventListener("click", () => {
    filterForm.reset();
    appliedFilters = readFilters();
  }, true);

  // En esta ventana solo la X o «Aplicar filtros» la cierran; Escape o el backdrop no.
  filterDialog.addEventListener("cancel", (event) => event.preventDefault());
  filterDialog.addEventListener("click", (event) => {
    if (event.target === filterDialog) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();
