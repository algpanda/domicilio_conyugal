// Actualiza las tarjetas sin contador; solo las modifica cuando hay texto que limpiar.
(() => {
  function removeIngredientCounts() {
    document.querySelectorAll(".recipe-card .recipe-details").forEach((details) => {
      const currentText = details.textContent;
      const cleanedText = currentText.replace(/^\s*\d+\s+ingredientes(?:\s*·\s*)?/i, "");
      if (cleanedText !== currentText) details.textContent = cleanedText;
    });
  }
  const observer = new MutationObserver(removeIngredientCounts);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  removeIngredientCounts();
})();
