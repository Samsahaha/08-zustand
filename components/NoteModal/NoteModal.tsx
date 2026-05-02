"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import { Modal } from "@/components/Modal/Modal";
import { NoteDetails } from "@/components/NoteDetails/NoteDetails";

type NoteModalProps = {
  note: Note;
};

export function NoteModal({ note }: NoteModalProps) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()} labelledBy="note-modal-title">
      <NoteDetails note={note} variant="modal" titleId="note-modal-title" />
    </Modal>
  );
}
