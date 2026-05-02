"use client";

import { NotesClient } from "../../NotesClient";
import type { NoteTag } from "@/types/note";

type NotesProps = {
  filterTag?: NoteTag;
};

export function Notes({ filterTag }: NotesProps) {
  return <NotesClient filterTag={filterTag} />;
}
