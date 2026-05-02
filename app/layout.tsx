import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { getSiteUrl } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const siteUrl = getSiteUrl();
const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NoteHub — нотатки з тегами та пошуком",
    template: "%s · NoteHub",
  },
  description:
    "NoteHub допомагає зберігати нотатки, фільтрувати їх за тегами та швидко знаходити потрібне.",
  openGraph: {
    title: "NoteHub — нотатки з тегами та пошуком",
    description:
      "NoteHub допомагає зберігати нотатки, фільтрувати їх за тегами та швидко знаходити потрібне.",
    images: [{ url: ogImage }],
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={roboto.variable}>
      <body className={roboto.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
