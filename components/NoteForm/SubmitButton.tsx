"use client";

import { useFormStatus } from "react-dom";
import css from "./NoteForm.module.css";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={css.submitButton} type="submit" disabled={pending}>
      Save note
    </button>
  );
}
