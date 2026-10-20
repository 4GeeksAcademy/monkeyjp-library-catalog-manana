import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { createBook } from "../services/books";
import type { Book } from "../types/book";

type Props = {
  onCreated: (book: Book) => void;
};

export default function BookForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const created = await createBook({
        title,
        author,
        year,
        available: true,
      });

      onCreated(created);

      setTitle("");
      setAuthor("");
      setYear(new Date().getFullYear());
    } catch {
      setError("Could not add book. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-y border-rule bg-white/60 px-5 py-6"
    >
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Add a new book
        </h2>
        <p className="text-sm text-ink/70">
          Add a title to the library catalog.
        </p>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-md bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label htmlFor="book-title" className="mb-1 block text-sm font-medium text-ink/80">
            Book title
          </label>
          <input
            id="book-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-md border border-rule bg-white px-4 py-2.5 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
          />
        </div>

        <div>
          <label htmlFor="book-author" className="mb-1 block text-sm font-medium text-ink/80">
            Author
          </label>
          <input
            id="book-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            className="w-full rounded-md border border-rule bg-white px-4 py-2.5 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
          />
        </div>

        <div>
          <label htmlFor="book-year" className="mb-1 block text-sm font-medium text-ink/80">
            Publication year
          </label>
          <input
            id="book-year"
            type="number"
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            required
            className="w-full rounded-md border border-rule bg-white px-4 py-2.5 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 self-end rounded-md bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest/90"
        >
          <Plus size={18} aria-hidden="true" />
          Add book
        </button>
      </div>
    </form>
  );
}