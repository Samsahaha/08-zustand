import type { ReactNode } from "react";
import { SidebarNotes } from "@/components/SidebarNotes/SidebarNotes";
import css from "./LayoutNotes.module.css";

type LayoutNotesProps = {
  tags: string[];
  children: ReactNode;
};

export function LayoutNotes({ tags, children }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <SidebarNotes tags={tags} />
      </div>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
