import type { Metadata } from "next";
import { Suspense } from "react";
import { getSiteUrl } from "@/lib/site";
import type { NoteTag } from "@/types/note";
import { NOTE_TAGS } from "@/types/note";
import { Notes } from "./Notes.client";

const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

function resolveTag(slug: string[] | undefined): NoteTag | undefined {
  const raw = slug?.[0];
  if (!raw) {
    return undefined;
  }
  const decoded = decodeURIComponent(raw);
  return NOTE_TAGS.includes(decoded as NoteTag)
    ? (decoded as NoteTag)
    : undefined;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = resolveTag(slug);
  const label = tag ?? decodeURIComponent(slug?.[0] ?? "");
  const title = label
    ? `Нотатки з фільтром «${label}»`
    : "Фільтр нотаток за тегом";
  const description = label
    ? `Переглядайте нотатки, відфільтровані за тегом «${label}», у застосунку NoteHub.`
    : "Сторінка фільтрації нотаток за обраним тегом у NoteHub.";
  const siteUrl = getSiteUrl();
  const pathTag = label ? encodeURIComponent(label) : "";
  const url = `${siteUrl}/notes/filter/${pathTag}`;

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
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = resolveTag(slug);

  return (
    <Suspense fallback={<p style={{ padding: 16 }}>Завантаження…</p>}>
      <Notes filterTag={tag} />
    </Suspense>
  );
}
