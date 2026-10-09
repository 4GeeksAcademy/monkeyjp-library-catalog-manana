# Búsqueda por título

## Objetivo
Permitir encontrar libros del catálogo mediante una búsqueda por título.

## Usuario
Persona que consulta el catálogo de libros.

## Historias de usuario
- Como usuario, quiero buscar libros por una parte de su título para encontrar coincidencias sin conocer el título completo.

## Requisitos funcionales
- El sistema debe filtrar libros por coincidencia parcial del título, sin distinguir mayúsculas y minúsculas.
- El sistema debe usar `GET /api/books?title=<string>` para solicitar los libros filtrados.
- Si el campo de búsqueda está vacío, el sistema debe mostrar todos los libros.
- Si no hay coincidencias, el sistema debe mostrar exactamente: `No se encontraron libros`.

## Criterios de aceptación
1. Una búsqueda con parte de un título muestra los libros cuyo título contiene ese texto.
2. La búsqueda devuelve las mismas coincidencias independientemente de las mayúsculas o minúsculas del texto ingresado.
3. El filtrado se solicita mediante `GET /api/books?title=<string>`.
4. Al dejar vacío el campo de búsqueda, se muestran todos los libros.
5. Cuando no hay coincidencias, se muestra exactamente `No se encontraron libros`.

## Casos de prueba
1. Con un libro titulado `El principito`, buscar `princip` debe incluir ese libro.
2. Con un libro titulado `El principito`, buscar `PRINCIP` debe incluir ese libro.
3. Con el campo de búsqueda vacío, deben mostrarse todos los libros.
4. Si la búsqueda no coincide con ningún título, debe mostrarse exactamente `No se encontraron libros`.
5. Al buscar `princip`, debe usarse `GET /api/books?title=princip`.

## Fuera del alcance
- Buscar libros por campos distintos del título.