import { CheckCircle2, XCircle } from "lucide-react";
import type { Book } from "../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <article className="flex h-full flex-col border-b border-rule bg-white/60 p-5">
      <h2 className="mb-1 break-words font-display text-xl font-semibold leading-snug text-ink">
        {book.title}
      </h2>

      <p className="text-sm text-ink/70">{book.author}</p>

      <div className="mt-auto flex items-center justify-between border-t border-rule pt-3">
        <span className="text-sm font-medium text-ink/70">
          {book.year}
        </span>

        {book.available ? (
          <span className="flex items-center gap-1 rounded-sm bg-leafwash px-2.5 py-1 text-xs font-medium text-forest">
            <CheckCircle2 size={14} aria-hidden="true" />
            Available
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-sm bg-brass/10 px-2.5 py-1 text-xs font-medium text-brass">
            <XCircle size={14} aria-hidden="true" />
            Unavailable
          </span>
        )}
      </div>
    </article>
  );
}