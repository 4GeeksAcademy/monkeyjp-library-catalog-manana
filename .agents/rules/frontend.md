# Reglas de frontend

## Objetivo
Mantener coherente la UI del catálogo y su comunicación con la API.

## Justificación
Las peticiones están centralizadas en `frontend/src/services/books.ts`, que usa rutas `/api` y comprueba `response.ok`. `App.tsx` consume ese servicio y `BookForm.tsx` usa `createBook`. El proxy de Vite dirige `/api` a `host.docker.internal:8000`.

## Reglas
- Centraliza las llamadas HTTP en `src/services/`; los componentes no deben duplicar `fetch` ni fijar la URL del backend.
- Comprueba errores HTTP en el servicio y maneja los rechazos en la UI. Distingue carga, estado vacío y error; informa fallos del alta.
- Si cambia un campo del libro, alinea el tipo `src/types/book.ts`, el formulario y el payload enviado al backend.
- Si cambia el entorno o la URL de API, revisa también `vite.config.ts` y Compose.

## Ejemplo correcto
Patrón actual de `src/services/books.ts`:

```ts
export async function getBooks(): Promise<Book[]> {
  const response = await fetch("/api/books");
  if (!response.ok) throw new Error("Could not load books");
  return response.json();
}
```

## Ejemplo incorrecto
No hagas la llamada directamente desde un componente ni omitas la comprobación de respuesta:

```ts
useEffect(() => {
  fetch("http://localhost:8000/api/books")
    .then((response) => response.json())
    .then(setBooks);
}, []);
```
