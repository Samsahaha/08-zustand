import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayoutNotes } from "@/components/LayoutNotes/LayoutNotes";
import { fetchNoteById } from "@/lib/api";
import { getSiteUrl } from "@/lib/site";
import { NOTE_TAGS } from "@/types/note";
import { NoteDetailsClient } from "./NoteDetails.client";

const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const title = note.title;
    const description =
      note.content.length > 160
        ? `${note.content.slice(0, 157)}…`
        : note.content;
    const siteUrl = getSiteUrl();
    const url = `${siteUrl}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [{ url: ogImage }],
      },
    };
  } catch {
    return {
      title: "Нотатку не знайдено",
      description: "Запис із таким ідентифікатором у NoteHub відсутній.",
    };
  }
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return (
      <LayoutNotes tags={NOTE_TAGS}>
        <NoteDetailsClient note={note} />
      </LayoutNotes>
    );
  } catch {
    notFound();
  }
}
