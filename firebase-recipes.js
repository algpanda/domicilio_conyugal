import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

function showLoadError(message) {
  const error = document.querySelector("#access-error");
  if (error) error.textContent = message;
  console.error(message);
}

function hasPlaceholderConfig() {
  return Object.values(firebaseConfig).some((value) => !value || value.includes("PEGA_AQUI"));
}

async function start() {
  if (hasPlaceholderConfig()) {
    throw new Error("Configura Firebase en firebase-config.js antes de cargar las recetas.");
  }

  const firebaseApp = initializeApp(firebaseConfig);
  const database = getFirestore(firebaseApp);
  const snapshot = await getDocs(collection(database, "recetas"));
  window.RECETAS = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));

  await import("./receta-duraciones.js");
  await import("./app.js");
  await import("./recipe-filter-enhancements.js");
  await import("./recipe-images.js");
  await import("./recipe-modal.js");
  await import("./recipe-card-cleanup.js");
  await import("./recipe-metadata.js");
}

start().catch((error) => {
  showLoadError("No se pudieron cargar las recetas desde Firebase. Comprueba la configuración y las reglas de Firestore e inténtalo de nuevo.");
  console.error("Error al iniciar el recetario desde Firebase:", error);
});
