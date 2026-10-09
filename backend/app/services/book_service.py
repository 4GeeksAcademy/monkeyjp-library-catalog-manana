from app.data.books import BOOKS
from app.models.book import BookCreate


def list_books(title: str | None = None):
    if not title:
        return BOOKS

    search_term = title.lower()
    return [book for book in BOOKS if search_term in book["title"].lower()]


def get_book(book_id: int):
    return next((book for book in BOOKS if book["id"] == book_id), None)


def add_book(data: BookCreate):
    next_id = max((book["id"] for book in BOOKS), default=0) + 1
    book = {"id": next_id, **data.model_dump()}
    BOOKS.append(book)
    return book
