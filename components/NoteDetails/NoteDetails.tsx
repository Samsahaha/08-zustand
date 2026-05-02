import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

type NoteDetailsProps = {
  note: Note;
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag} title={note.tag}>
              {note.tag}
            </span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formatDate(note.createdAt)}</p>
          <Link className={css.backBtn} href="/notes">
            ← Back to notes
          </Link>
        </div>
      </div>
    </main>
  );
}
