"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { createNoteRequest } from "@/lib/api/notes";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import { NOTE_TAGS } from "@/types/note";
import css from "./CreateNote.module.css";

export function CreateNote() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const clearDraft = useNoteStore((s) => s.clearDraft);

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm
          action={(formData) =>
            startTransition(async () => {
              const title = String(formData.get("title") ?? "");
              const content = String(formData.get("content") ?? "");
              const tagRaw = String(formData.get("tag") ?? "Todo");
              const tag: NoteTag = NOTE_TAGS.includes(tagRaw as NoteTag)
                ? (tagRaw as NoteTag)
                : "Todo";
              await createNoteRequest({ title, content, tag });
              clearDraft();
              router.back();
            })
          }
        />
        {isPending ? (
          <p style={{ marginTop: 12, fontSize: 14 }}>Saving…</p>
        ) : null}
      </div>
    </main>
  );
}
