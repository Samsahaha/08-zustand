import { Suspense } from "react";
import { NotesClient } from "./NotesClient";

export default function NotesPage() {
  return (
    <Suspense fallback={<p style={{ padding: 16 }}>Завантаження…</p>}>
      <NotesClient />
    </Suspense>
  );
}
