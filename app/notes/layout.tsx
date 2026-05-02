import type { ReactNode } from "react";
import { LayoutNotes } from "@/components/LayoutNotes/LayoutNotes";
import { NOTE_TAGS } from "@/types/note";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return <LayoutNotes tags={NOTE_TAGS}>{children}</LayoutNotes>;
}
