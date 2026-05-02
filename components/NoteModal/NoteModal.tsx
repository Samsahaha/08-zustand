"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import { NoteDetails } from "@/components/NoteDetails/NoteDetails";
import css from "./NoteModal.module.css";

type NoteModalProps = {
  note: Note;
};

export function NoteModal({ note }: NoteModalProps) {
  const router = useRouter();

  return (
    <div
      className={css.backdrop}
      role="presentation"
      onClick={() => router.back()}
    >
      <div
        className={css.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={css.close}
          onClick={() => router.back()}
        >
          Close
        </button>
        <NoteDetails note={note} variant="modal" titleId="note-modal-title" />
      </div>
    </div>
  );
}
