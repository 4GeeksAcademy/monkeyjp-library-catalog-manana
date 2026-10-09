## Plan: Búsqueda por título

**Cambios**
- **Backend:** aceptar `title` opcional en `GET /books`; filtrar en el servicio por coincidencia parcial sin distinguir mayúsculas. Sin valor, devolver todos los libros.
- **Frontend:** permitir que `getBooks` envíe el título y que `App` muestre los resultados del servidor y el mensaje exacto `No se encontraron libros`. Mantener los contadores basados en el catálogo completo.

**Archivos afectados**
- `backend/app/routes/books.py`
- `backend/app/services/book_service.py`
- `frontend/src/services/books.ts`
- `frontend/src/App.tsx`

**Orden recomendado**
1. Backend: servicio y ruta.
2. Frontend: servicio API y UI.

**Verificación básica**
- Ejecutar `npm run build` y `npm run lint` desde `frontend/`.
- Levantar con `docker compose up --build`; revisar coincidencia parcial, mayúsculas, título vacío y búsqueda sin resultados, incluido el mensaje exacto.

**Riesgo**
La búsqueda actual por autor dejaría de funcionar, como corresponde al alcance de la spec. Además, si los contadores usan los resultados filtrados, cambiarían al buscar; deben seguir representando el catálogo completo.