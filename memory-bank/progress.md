# Progreso del proyecto

## Funciona
- El frontend muestra el catálogo, cuenta disponibilidad y filtra por coincidencia parcial del título sin distinguir mayúsculas. (`frontend/src/App.tsx`)
- Permite añadir libros y consultarlos por ID; la API ofrece listado filtrable por `title`, consulta por ID y alta. (`frontend/src/components/BookForm.tsx`, `frontend/src/services/books.ts`, `backend/app/routes/books.py`)
- La consulta por ID devuelve el libro existente; el ID inexistente devuelve `404`. Se comprobó a través del proxy: `/api/books/1` respondió `200` y `/api/books/999999` respondió `404`.
- `npm run build` y `npm run lint` finalizaron correctamente después del cambio de consulta por ID. Ambos comandos están definidos en `frontend/package.json`.
- `docker compose up --build` finalizó con código `0` en la terminal disponible.
- `GET /api/books?title=Hob` y `GET /api/books?title=HOB` devolvieron la misma coincidencia; `title` vacío devolvió el catálogo completo y un término sin coincidencias devolvió una lista vacía. La UI servida contiene el mensaje exacto `No se encontraron libros`.

## Limitaciones actuales
- No hay rutas para actualizar o eliminar libros. (`backend/app/routes/books.py`)
- El formulario de alta siempre crea libros con `available: true`; la interfaz no cambia ese estado. (`frontend/src/components/BookForm.tsx`)
- El servicio modifica `BOOKS` en memoria; el código revisado no demuestra persistencia. (`backend/app/services/book_service.py`)
- La carga inicial no tiene un estado de carga separado y puede mostrar “No books found” antes de recibir la respuesta. (`frontend/src/App.tsx`)
- El alta no captura errores ni muestra un estado de envío. (`frontend/src/components/BookForm.tsx`)
- El modelo no establece límites para el año más allá de que sea entero. (`backend/app/models/book.py`)

## Próximos pasos sugeridos
- Añadir estados explícitos de carga, vacío y error para el catálogo, y capturar errores del alta con feedback visible.
- Definir límites de dominio para el año y validar entradas en frontend y backend de forma coherente.
- Si se necesita conservar los cambios entre reinicios, evaluar persistencia y sustituir la lista en memoria.
- Si se requiere administrar disponibilidad, edición o eliminación, definir primero esas operaciones en la API y luego en la interfaz.
- Añadir pruebas automatizadas para carga, alta, consulta por ID y respuestas de error; `frontend/package.json` no define actualmente un script de tests.
