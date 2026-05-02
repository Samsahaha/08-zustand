import type { ReactNode } from "react";
import layoutCss from "@/components/LayoutNotes/LayoutNotes.module.css";

export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className={layoutCss.container}>
      <div className={layoutCss.sidebar}>{sidebar}</div>
      <div className={layoutCss.notesWrapper}>{children}</div>
    </div>
  );
}
