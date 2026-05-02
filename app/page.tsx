import Link from "next/link";
import css from "./Home.module.css";

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>NoteHub</h1>
        <p className={css.description}>
          Легкий застосунок для нотаток: теги, пошук і швидкий доступ до
          записів.
        </p>
        <p className={css.description}>
          Перейдіть до розділу нотаток, щоб переглянути список, додати новий
          запис або відфільтрувати за тегом.
        </p>
        <p className={css.description}>
          <Link href="/notes">Відкрити нотатки →</Link>
        </p>
      </div>
    </main>
  );
}
