# Verificación del proyecto

| Afirmación original | Archivos revisados | Resultado | Corrección si fuera necesaria |
|---|---|---|---|
| La API lista libros, consulta por ID y crea; no actualiza ni borra. | `backend/app/routes/books.py` | Confirmada | — |
| El formulario envía título, autor, año y disponibilidad; el backend exige título y autor no vacíos. | `frontend/src/components/BookForm.tsx`, `backend/app/models/book.py` | Confirmada | — |
| El frontend usa `/api` y Vite lo redirige a `host.docker.internal:8000`. | `frontend/src/services/books.ts`, `frontend/vite.config.ts`, `docker-compose.yml` | Confirmada | — |
| `BOOKS` solo se mantiene en memoria y los cambios no persisten. | `backend/app/services/book_service.py`, `backend/app/data/books.py` | Parcial | El servicio modifica la lista en memoria con `BOOKS.append`; el contenido de `data/books.py` no se pudo inspeccionar, así que no se confirma la persistencia total ni los datos iniciales. |
| Docker Compose levanta frontend y backend en los puertos `5173` y `8000`. | `docker-compose.yml`, `README.md` | Parcial | La configuración publica esos puertos y documenta `docker compose up --build`; no se verificó que ambos servicios respondan correctamente en ejecución. |
