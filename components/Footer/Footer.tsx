import css from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <span>NoteHub — learning project</span>
      </div>
    </footer>
  );
}
