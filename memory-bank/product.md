# Resumen del producto

Library Catalog es una aplicación web para consultar y ampliar un catálogo de libros.

## Funcionalidades actuales
- Muestra los libros con título, autor, año y disponibilidad, además de conteos totales, disponibles y no disponibles.
- Permite filtrar la colección por coincidencia parcial del título, sin distinguir mayúsculas y minúsculas.
- Permite añadir libros indicando título, autor y año; el formulario crea el libro como disponible.
- Permite consultar un libro por ID y presenta errores de búsqueda, incluido el caso de ID no encontrado.
- La API permite listar libros, obtener uno por ID y crear libros; también expone `/api/health`.

## Datos y límites
- El modelo de libro contiene `id`, `title`, `author`, `year` y `available`. El backend requiere título y autor con longitud mínima de 1; `available` tiene valor predeterminado `true`.
- El servicio opera sobre una colección `BOOKS` en memoria y, al crear, asigna el máximo ID actual más uno (o `1` si está vacía).
- No hay rutas para actualizar ni eliminar libros.
- El código revisado no demuestra persistencia en una base de datos ni un flujo de préstamos; no se especifican aquí usuarios o perfiles de usuario.
