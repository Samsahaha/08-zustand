import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { NotePreviewClient } from "./NotePreview.client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedNoteModalPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return <NotePreviewClient note={note} />;
  } catch {
    notFound();
  }
}
