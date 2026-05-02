"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import type { NoteTag } from "@/types/note";
import { NOTE_TAGS } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import { SubmitButton } from "./SubmitButton";
import css from "./NoteForm.module.css";

type NoteFormProps = {
  action: (formData: FormData) => void | Promise<void>;
};

export function NoteForm({ action }: NoteFormProps) {
  const router = useRouter();
  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);

  const tagOptions = useMemo(() => {
    const set = new Set(NOTE_TAGS);
    if (draft.tag) {
      set.add(draft.tag);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [draft.tag]);

  return (
    <form className={css.form} action={action}>
      <div className={css.formGroup}>
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          className={css.input}
          name="title"
          required
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          className={css.textarea}
          name="content"
          required
          rows={6}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="note-tag">Tag</label>
        <select
          id="note-tag"
          className={css.select}
          name="tag"
          value={tagOptions.includes(draft.tag) ? draft.tag : tagOptions[0]}
          onChange={(e) => {
            const v = e.target.value;
            setDraft({
              tag: NOTE_TAGS.includes(v as NoteTag) ? (v as NoteTag) : "Todo",
            });
          }}
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button
          className={css.cancelButton}
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}
