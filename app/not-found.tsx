import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site";

const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  description:
    "Такої сторінки в NoteHub не існує. Перевірте адресу або поверніться на головну.",
  openGraph: {
    title: "Сторінку не знайдено · NoteHub",
    description:
      "Запитаної сторінки немає в застосунку NoteHub. Оберіть інший розділ або поверніться назад.",
    url: siteUrl,
    images: [{ url: ogImage }],
  },
};

export default function NotFound() {
  return (
    <main style={{ flex: 1, padding: "48px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>404</h1>
      <p style={{ marginBottom: 24, color: "#444" }}>
        Такої сторінки не існує. Перейдіть на головну або до списку нотаток.
      </p>
      <p>
        <Link href="/" style={{ color: "#0d6efd", fontWeight: 600 }}>
          На головну
        </Link>
        {" · "}
        <Link href="/notes" style={{ color: "#0d6efd", fontWeight: 600 }}>
          Нотатки
        </Link>
      </p>
    </main>
  );
}
