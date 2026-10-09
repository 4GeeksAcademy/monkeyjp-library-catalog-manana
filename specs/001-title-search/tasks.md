## Backend
- [x] T1 -- Añadir filtrado parcial del título, sin distinguir mayúsculas, al servicio de listado; sin título, devolver todos los libros.
- [x] T2 -- Aceptar el parámetro opcional `title` en `GET /books` y delegarlo al servicio.

## Frontend
- [x] T3 -- Actualizar `getBooks` para enviar el parámetro `title` a `/api/books`.
- [x] T4 -- Conectar la búsqueda de `App` con los resultados solicitados, mostrar exactamente `No se encontraron libros` cuando no haya coincidencias y mantener los contadores del catálogo completo.

## Verificación
- [x] T5 -- Ejecutar `npm run build` y `npm run lint` en `frontend/`, y levantar el proyecto con `docker compose up --build`.
- [x] T6 -- Verificar los criterios de aceptación de `spec.md`: coincidencia parcial, insensibilidad a mayúsculas, petición `GET /api/books?title=<string>`, campo vacío muestra todos los libros y mensaje exacto sin resultados.