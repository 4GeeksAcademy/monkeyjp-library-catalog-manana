# Contexto técnico

## Stack
- **Frontend:** React, TypeScript y Vite; Tailwind CSS se integra mediante el plugin de Vite. Referencia: `frontend/package.json`, `frontend/vite.config.ts`.
- **Backend:** FastAPI, Uvicorn y Pydantic. Referencia: `backend/requirements.txt`; la aplicación se configura en `backend/app/main.py`.

## Estructura
- `frontend/src/`: UI en `App.tsx`, componentes en `components/`, llamadas HTTP en `services/` y tipos en `types/`.
- `backend/app/`: punto de entrada en `main.py`; routers en `routes/`, modelos en `models/` y lógica de negocio en `services/`.
- `docker-compose.yml`: define los servicios `frontend` y `backend`.

## Comandos
- Desde la raíz, construir e iniciar ambos servicios: `docker compose up --build`.
- Desde `frontend/`: `npm run dev`, `npm run build`, `npm run lint`.
- Los scripts frontend están declarados en `frontend/package.json`; el comando Compose está documentado en `README.md`.

## Comunicación frontend-backend
- `frontend/src/services/books.ts` usa `fetch` con rutas relativas bajo `/api`, incluyendo `GET /api/books?title=<string>`, `GET /api/books/{book_id}` y `POST /api/books`. El parámetro `title` opcional filtra el listado.
- En desarrollo, `frontend/vite.config.ts` configura el proxy `/api` hacia `http://host.docker.internal:8000`.
- `docker-compose.yml` publica `5173:5173` para frontend y `8000:8000` para backend; también configura `host.docker.internal` para el contenedor frontend.
- `backend/app/main.py` registra el router de libros bajo el prefijo `/api` y define `GET /api/health`.
- Las rutas de libros están en `backend/app/routes/books.py`: `GET /api/books` con parámetro opcional `title`, `GET /api/books/{book_id}` y `POST /api/books`.
