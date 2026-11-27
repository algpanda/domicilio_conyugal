# Configurar Firebase para las recetas

La aplicación obtiene ahora el catálogo de Firestore en vez de cargar `recetas.js`.

## Puesta en marcha

1. En Firebase Console, crea un proyecto y una aplicación web. Crea una base de datos de **Cloud Firestore**.
2. Copia la configuración de la aplicación web en `firebase-config.js` (los campos `apiKey`, `authDomain`, `projectId` y `appId`). La configuración web identifica el proyecto; **no** pegues aquí una clave de cuenta de servicio ni otra credencial privada.
3. En Firestore, crea la colección `recipes`. Cada documento es una receta; el ID del documento puede ser cualquiera. Usa los campos que ya consume el sitio, por ejemplo:

```json
{
  "name": "Receta de ejemplo",
  "description": "Descripción breve",
  "tipo": "Salado",
  "region": "Mediterránea",
  "tiempoMinutos": "<30 minutos",
  "novedad": "No",
  "etiquetas": ["Comida en casa"],
  "materiasPrimas": ["Verduras"],
  "imageUrl": "https://ejemplo.com/receta.jpg",
  "ingredients": ["Ingrediente 1"],
  "instructions": ["Paso 1"],
  "tips": [],
  "fuente": "",
  "fecha": ""
}
```

4. Configura las reglas de Firestore según quién debe poder consultar el recetario. Esta app no inicia sesión en Firebase: para que funcione con sus reglas actuales, las recetas deben ser legibles desde el navegador. Si se permite lectura pública, **cualquier persona que conozca el proyecto puede leer los datos**; deniega escrituras desde el cliente y no guardes información sensible. El código de acceso de la página es solo una pantalla de privacidad casual, no autenticación segura.
5. Publica el sitio por HTTPS y prueba que Firestore contiene documentos en `recipes`.

La aplicación mantiene los nombres de campo actuales, incluida la duración normalizada por `receta-duraciones.js`. La importación inicial de las recetas existentes a Firestore se hace desde Firebase Console o una herramienta administrativa segura; no se deben incluir credenciales de administrador en el frontend.
