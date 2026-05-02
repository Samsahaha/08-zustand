import { notFound } from "next/navigation";
import { NoteModal } from "@/components/NoteModal/NoteModal";
import { fetchNoteById } from "@/lib/api/notes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedNoteModalPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return <NoteModal note={note} />;
  } catch {
    notFound();
  }
}
