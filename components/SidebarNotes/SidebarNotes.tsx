import Link from "next/link";
import css from "./SidebarNotes.module.css";

type SidebarNotesProps = {
  tags: string[];
};

export function SidebarNotes({ tags }: SidebarNotesProps) {
  return (
    <aside aria-label="Filter by tag">
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes">
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              className={css.menuLink}
              href={`/notes/filter/${encodeURIComponent(tag)}`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
