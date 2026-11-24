// Quita el contador de ingredientes sin volver a escribir tarjetas ya limpias.
(() => {
  function removeIngredientCounts() {
    document.querySelectorAll(".recipe-card .recipe-details").forEach((details) => {
      const currentText = details.textContent;
      const cleanedText = currentText.replace(/^\s*\d+\s+ingredientes(?:\s*·\s*)?/i, "");
      // Evita generar mutaciones innecesarias que volverían a disparar el observer indefinidamente.
      if (cleanedText !== currentText) details.textContent = cleanedText;
    });
  }

  const observer = new MutationObserver(removeIngredientCounts);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  removeIngredientCounts();
})();
