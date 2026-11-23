// Muestra una miniatura para cada tarjeta. Para usar una imagen real, añade a cada
// receta en recetas.js: imageUrl: "https://.../tu-imagen.jpg",
(() => {
  const placeholder = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
      <rect width="240" height="180" rx="20" fill="#eef1e8"/>
      <circle cx="120" cy="80" r="43" fill="#fffefa"/>
      <path d="M77 81c12-25 34-32 44-32 18 0 36 11 43 32-14 3-27 15-43 15-15 0-28-12-44-15Z" fill="#8da18a"/>
      <path d="M88 103c17 10 46 12 65 0" fill="none" stroke="#c89b66" stroke-width="6" stroke-linecap="round"/>
      <text x="120" y="151" text-anchor="middle" fill="#788273" font-family="sans-serif" font-size="13">Tu foto aquí</text>
    </svg>
  `)}`;

  const styles = document.createElement("style");
  styles.textContent = `
    .recipe-card { display: flex; align-items: stretch; gap: 14px; }
    .recipe-card-copy { min-width: 0; flex: 1; }
    .recipe-card-image { width: 112px; min-height: 100px; flex: 0 0 112px; align-self: center; object-fit: cover; border-radius: 9px; background: #eef1e8; }
    @media (max-width: 420px) {
      .recipe-card { gap: 10px; padding: 11px; }
      .recipe-card-image { width: 82px; min-height: 82px; flex-basis: 82px; }
    }
  `;
  document.head.append(styles);

  function addImages() {
    document.querySelectorAll(".recipe-card:not([data-image-ready])").forEach((card) => {
      const recipeName = card.querySelector("h3")?.textContent;
      const recipe = (window.RECETAS || []).find((item) => item.name === recipeName);
      if (!recipe) return;

      const copy = document.createElement("span");
      copy.className = "recipe-card-copy";
      while (card.firstChild) copy.append(card.firstChild);

      const image = document.createElement("img");
      image.className = "recipe-card-image";
      image.src = recipe.imageUrl || placeholder;
      image.alt = recipe.imageUrl ? `Imagen de ${recipe.name}` : `Imagen provisional para ${recipe.name}`;
      image.loading = "lazy";
      image.addEventListener("error", () => {
        image.src = placeholder;
        image.alt = `Imagen provisional para ${recipe.name}`;
      }, { once: true });

      card.append(copy, image);
      card.dataset.imageReady = "true";
    });
  }

  const observer = new MutationObserver(addImages);
  observer.observe(document.querySelector("#inicio"), { childList: true, subtree: true });
  addImages();
})();
