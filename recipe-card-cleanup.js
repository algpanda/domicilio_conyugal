// Actualiza las tarjetas de recetas sin mostrar el contador de ingredientes.
(() => {
  function removeIngredientCounts() {
    document.querySelectorAll(".recipe-card .recipe-details").forEach((details) => {
      const text = details.textContent;
      details.textContent = text.replace(/^\s*\d+\s+ingredientes(?:\s*·\s*)?/i, "");
    });
  }

  const observer = new MutationObserver(removeIngredientCounts);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  removeIngredientCounts();
})();
