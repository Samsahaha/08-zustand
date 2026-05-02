import Link from "next/link";
import css from "./Header.module.css";

export function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/">
        NoteHub
      </Link>
      <nav>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/notes">
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
