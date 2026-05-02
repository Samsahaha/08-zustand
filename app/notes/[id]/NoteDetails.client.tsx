"use client";

import type { Note } from "@/types/note";
import { NoteDetails } from "@/components/NoteDetails/NoteDetails";

type NoteDetailsClientProps = {
  note: Note;
};

export function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  return <NoteDetails note={note} />;
}
