import { useEffect, useState, type FormEvent } from "react";
import { BookOpen, Library, Search } from "lucide-react";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import { getBook, getBooks } from "./services/books";
import type { Book } from "./types/book";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookById, setBookById] = useState<Book | null>(null);
  const [bookLookupError, setBookLookupError] = useState("");
  const [isLookingUpBook, setIsLookingUpBook] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    getBooks(search)
      .then((results) => {
        if (!search) {
          setBooks(results);
        }
        if (isCurrentRequest) {
          setFilteredBooks(results);
        }
      })
      .catch(() => {
        if (isCurrentRequest) {
          setError("Could not load catalog");
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [search]);

  async function handleBookLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookById(null);
    setBookLookupError("");

    const parsedBookId = Number(bookId);
    if (!Number.isInteger(parsedBookId) || parsedBookId < 1) {
      setBookLookupError("Enter a valid book ID");
      return;
    }

    setIsLookingUpBook(true);
    try {
      setBookById(await getBook(parsedBookId));
    } catch (lookupError) {
      setBookLookupError(
        lookupError instanceof Error ? lookupError.message : "Could not load book"
      );
    } finally {
      setIsLookingUpBook(false);
    }
  }

  const availableBooks = books.filter((book) => book.available).length;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-forest text-white">
              <Library size={24} />
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-ink">
                Library Catalog
              </h1>
              <p className="text-sm text-ink/70">
                Manage your library collection
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <section aria-labelledby="collection-heading">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 id="collection-heading" className="font-display text-2xl font-bold text-ink">
                Book collection
              </h2>
              <p className="text-sm text-ink/70">
                Browse the books currently registered.
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/55"
              />

              <label htmlFor="book-search" className="sr-only">
                Search books
              </label>
              <input
                id="book-search"
                value={search}
                onChange={(event) => {
                  setError("");
                  setSearch(event.target.value);
                }}
                placeholder="Search books..."
                className="w-full rounded-md border border-rule bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20 md:w-72"
              />
            </div>
          </div>

          <form
            onSubmit={handleBookLookup}
            className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div>
              <label
                htmlFor="book-id"
                className="mb-1 block text-sm font-medium text-ink/80"
              >
                Find book by ID
              </label>
              <input
                id="book-id"
                type="number"
                min="1"
                step="1"
                required
                value={bookId}
                aria-invalid={Boolean(bookLookupError)}
                aria-describedby={bookLookupError ? "book-id-error" : undefined}
                onChange={(event) => {
                  setBookId(event.target.value);
                  setBookLookupError("");
                }}
                className="w-full rounded-md border border-rule bg-white px-4 py-2.5 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20 sm:w-56"
              />
            </div>
            <button
              type="submit"
              disabled={isLookingUpBook}
              className="rounded-md bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest/90 disabled:cursor-wait disabled:opacity-60"
            >
              {isLookingUpBook ? "Searching..." : "Find book"}
            </button>
          </form>

          {bookLookupError && (
            <div
              id="book-id-error"
              role="alert"
              className="mb-5 rounded-md bg-rose-50 p-4 text-sm text-rose-700"
            >
              {bookLookupError}
            </div>
          )}

          {bookById && (
            <div className="mb-5 max-w-sm">
              <BookCard book={bookById} />
            </div>
          )}

          {!error && (
            <p className="sr-only" role="status" aria-atomic="true">
              {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
            </p>
          )}

          {error ? (
            <div role="alert" className="rounded-md bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="border-y border-rule bg-white/60 py-16 text-center">
              <BookOpen
                size={40}
                className="mx-auto mb-3 text-forest/55"
              />
              <p className="font-medium text-ink/75">
                No books found
              </p>
            </div>
          )}
        </section>

        <BookForm
          onCreated={(book) => {
            setBooks((current) => [...current, book]);
            if (book.title.toLowerCase().includes(search.toLowerCase())) {
              setFilteredBooks((current) => [...current, book]);
            }
          }}
        />

        <section
          aria-label="Collection counts"
          className="grid gap-4 border-t border-rule py-5 sm:grid-cols-3"
        >
          <div>
            <p className="text-sm text-ink/70">Total books</p>
            <p className="mt-1 text-2xl font-semibold text-ink">{books.length}</p>
          </div>
          <div>
            <p className="text-sm text-ink/70">Available</p>
            <p className="mt-1 text-2xl font-semibold text-forest">{availableBooks}</p>
          </div>
          <div>
            <p className="text-sm text-ink/70">Unavailable</p>
            <p className="mt-1 text-2xl font-semibold text-brass">
              {books.length - availableBooks}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}