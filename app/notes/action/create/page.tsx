import type { Metadata } from "next";
import { CreateNote } from "@/components/CreateNote/CreateNote";
import { getSiteUrl } from "@/lib/site";

const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

const siteUrl = getSiteUrl();
const pageUrl = `${siteUrl}/notes/action/create`;

export const metadata: Metadata = {
  title: "Створити нотатку",
  description:
    "Додайте нову нотатку в NoteHub: заголовок, текст і тег. Чернетка зберігається автоматично.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Створити нотатку в NoteHub",
    description:
      "Форма для створення нової нотатки з тегом. Чернетка не губиться між візитами.",
    url: pageUrl,
    images: [{ url: ogImage }],
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}
