# AGENTS.md

## Proyecto
Catálogo de biblioteca para listar, buscar y agregar libros.

## Stack y estructura
- `frontend/`: React, TypeScript y Vite; UI en `src/`, llamadas API en `src/services/` y tipos en `src/types/`.
- `backend/`: FastAPI y Pydantic; aplicación en `app/main.py`, rutas en `app/routes/`, modelos en `app/models/` y lógica en `app/services/`.
- `docker-compose.yml` define los servicios frontend y backend.

## Comandos
- Arrancar ambos servicios: `docker compose up --build`.
- Frontend: `npm run dev`, `npm run build`, `npm run lint` (desde `frontend/`).

## Convenciones
- Mantener las rutas HTTP separadas de la lógica de negocio: los routers delegan al servicio.
- Centralizar las peticiones HTTP del frontend en `frontend/src/services/books.ts`.
- Al cambiar el modelo de libro, actualizar tanto el modelo Pydantic como el tipo TypeScript y el payload del formulario.

## Reglas de dominio
- Un libro tiene `id`, `title`, `author`, `year` y `available`; título y autor tienen longitud mínima de 1, y `available` por defecto es `true`.
- La API expone `GET /api/books`, `GET /api/books/{book_id}`, `POST /api/books` y `GET /api/health`.
- El servicio opera sobre `BOOKS` en memoria y asigna al crear el máximo ID actual más uno (o 1 si está vacía).

## Forma de trabajar
- Antes de trabajar en `frontend/`, leer `.agents/rules/frontend.md`.
- Antes de trabajar en `backend/`, leer `.agents/rules/backend.md`.
- Si cambia el contrato del libro, revisar frontend y backend juntos.
- Si cambia la ejecución o conectividad, revisar el proxy `/api` de Vite y la configuración de Compose.
- En la UI, distinguir carga, lista vacía y error; manejar también los errores del alta.

## Límites
- Las rutas actuales no incluyen actualización ni eliminación de libros.
- El servicio mostrado modifica una lista en memoria; no asumir persistencia en base de datos.

## Verificación
- Ejecutar `npm run build` y `npm run lint` desde `frontend/`.
- Arrancar con `docker compose up --build`.
- Comprobar la API en `/api/health` y `/api/books` en el backend publicado en el puerto `8000`.
- Los scripts frontend revisados no definen un comando de pruebas automatizadas.
