"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { deleteNoteRequest } from "@/lib/api/notes";
import css from "./NoteList.module.css";

type NoteListProps = {
  notes: Note[];
};

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNoteRequest(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag} title={note.tag}>
              {note.tag}
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <Link className={css.link} href={`/notes/${note.id}`}>
                View
              </Link>
              <button
                type="button"
                className={css.button}
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
