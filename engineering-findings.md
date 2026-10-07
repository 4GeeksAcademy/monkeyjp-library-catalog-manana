# Hallazgos y reglas de ingeniería

## Frontend

- **Hallazgo:** La carga del catálogo empieza con una lista vacía, por lo que la interfaz muestra “No books found” mientras espera la API o si la carga falla. El alta tampoco captura errores ni indica que está enviándose.  
  **Regla:** Representar explícitamente carga, vacío y error; al crear, capturar fallos y evitar envíos duplicados mientras la petición está pendiente.  
  **Archivos:** `frontend/src/App.tsx`, `frontend/src/components/BookForm.tsx`, `frontend/src/services/books.ts`

- **Hallazgo:** Las llamadas HTTP ya están centralizadas en el servicio y los componentes lo consumen.  
  **Regla:** Mantener rutas, métodos HTTP y comprobaciones de respuesta en `services/books.ts`; no duplicar `fetch` en componentes.  
  **Archivos:** `frontend/src/services/books.ts`, `frontend/src/App.tsx`, `frontend/src/components/BookForm.tsx`

- **Hallazgo:** El formulario marca los campos como requeridos, pero no recorta espacios y la validación del año es limitada.  
  **Regla:** Alinear validación visual y validación de API; definir explícitamente cómo manejar campos en blanco y años fuera de rango.  
  **Archivos:** `frontend/src/components/BookForm.tsx`, `backend/app/models/book.py`

- **Hallazgo:** Al agregar un libro, la lista se actualiza a partir del estado previo.  
  **Regla:** Conservar la actualización funcional (`current => ...`) cuando el nuevo estado depende del anterior.  
  **Archivo:** `frontend/src/App.tsx`

## Backend

- **Hallazgo:** El router define las rutas y delega las operaciones de catálogo al servicio.  
  **Regla:** Mantener esa separación: las rutas manejan HTTP y el servicio contiene la lógica del catálogo.  
  **Archivos:** `backend/app/routes/books.py`, `backend/app/services/book_service.py`

- **Hallazgo:** Pydantic valida el payload y define los modelos de respuesta; el tipo TypeScript representa el mismo libro en el frontend.  
  **Regla:** Al cambiar campos o restricciones, actualizar y verificar ambos lados del contrato.  
  **Archivos:** `backend/app/models/book.py`, `frontend/src/types/book.ts`

- **Hallazgo:** `add_book` agrega a `BOOKS` en memoria y calcula el siguiente ID usando el máximo actual más uno.  
  **Regla:** No asumir persistencia ni unicidad durable; si se añade almacenamiento persistente o concurrencia, sustituir esta estrategia y verificar las rutas de listado y consulta por ID.  
  **Archivos:** `backend/app/services/book_service.py`, `backend/app/routes/books.py`

- **Hallazgo:** Las rutas disponibles son listar, consultar por ID y crear.  
  **Regla:** Al ampliar operaciones del catálogo, definir explícitamente rutas y casos de error, y cubrir tanto entradas válidas como inválidas.  
  **Archivos:** `backend/app/routes/books.py`, `backend/app/models/book.py`

## Integración

- **Hallazgo:** El frontend llama `/api/books`; Vite redirige `/api` a `host.docker.internal:8000` y Compose publica los puertos `5173` y `8000` y configura ese hostname.  
  **Regla:** Si cambia el entorno, el proxy o los puertos, actualizar y verificar conjuntamente la configuración de Vite, Compose y el cliente API.  
  **Archivos:** `frontend/src/services/books.ts`, `frontend/vite.config.ts`, `docker-compose.yml`

- **Hallazgo:** Compose documenta e inicia los servicios con `docker compose up --build`; el comando completó con código de salida `0`, pero eso no verifica por sí solo las respuestas HTTP.  
  **Regla:** Después de cambios de integración, comprobar además que frontend y backend responden y que el proxy permite las llamadas API.  
  **Archivos:** `README.md`, `docker-compose.yml`, `backend/app/main.py`, `frontend/vite.config.ts`
