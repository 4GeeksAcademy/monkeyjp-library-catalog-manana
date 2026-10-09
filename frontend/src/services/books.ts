import type { Book } from "../types/book";

export async function getBooks(title = ""): Promise<Book[]> {
  const query = new URLSearchParams({ title });
  const response = await fetch(`/api/books?${query}`);

  if (!response.ok) {
    throw new Error("Could not load books");
  }

  return response.json();
}

export async function getBook(bookId: number): Promise<Book> {
  let response: Response;

  try {
    response = await fetch(`/api/books/${bookId}`);
  } catch {
    throw new Error("Could not load book");
  }

  if (response.status === 404) {
    throw new Error("Book not found");
  }

  if (!response.ok) {
    throw new Error("Could not load book");
  }

  return response.json();
}

export async function createBook(
  book: Omit<Book, "id">
): Promise<Book> {
  const response = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Could not create book");
  }

  return response.json();
}
