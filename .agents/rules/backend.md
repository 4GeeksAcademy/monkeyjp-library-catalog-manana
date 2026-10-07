# Reglas de backend

## Objetivo
Preservar la separación entre HTTP, validación del dominio y operaciones del catálogo.

## Justificación
`app/routes/books.py` declara rutas y delega a `app/services/book_service.py`. `app/models/book.py` define la validación Pydantic. El servicio actual opera sobre `BOOKS` en memoria y asigna el máximo ID actual más uno.

## Reglas
- Declara rutas HTTP en `app/routes/`; delega la lógica de catálogo en `app/services/`.
- Usa modelos Pydantic para validar entradas y `response_model` para tipar respuestas.
- Conserva el comportamiento de error `404` cuando la consulta por ID no encuentra un libro.
- Al cambiar el contrato, alinea `BookCreate`/`Book` con el tipo y payload del frontend.
- No asumas persistencia: el servicio mostrado modifica una lista en memoria. Si se cambia el almacenamiento o la generación de IDs, revisa las operaciones de listar y buscar.

## Ejemplo correcto
Patrón actual de `app/routes/books.py`:

```py
@router.post("", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(payload: BookCreate):
    return add_book(payload)
```

## Ejemplo incorrecto
No muevas la lógica de IDs y mutación de la colección al router:

```py
@router.post("")
def create_book(payload: BookCreate):
    book = {"id": len(BOOKS) + 1, **payload.model_dump()}
    BOOKS.append(book)
    return book
```
