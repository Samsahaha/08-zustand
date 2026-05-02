import { Suspense } from "react";
import { LayoutNotes } from "@/components/LayoutNotes/LayoutNotes";
import { NOTE_TAGS } from "@/types/note";
import { NotesClient } from "./NotesClient";

export default function NotesPage() {
  return (
    <LayoutNotes tags={NOTE_TAGS}>
      <Suspense fallback={<p style={{ padding: 16 }}>Завантаження…</p>}>
        <NotesClient />
      </Suspense>
    </LayoutNotes>
  );
}
