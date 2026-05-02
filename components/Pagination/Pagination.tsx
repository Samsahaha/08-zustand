import Link from "next/link";
import css from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export function Pagination({ page, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ul className={css.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <li key={p} className={p === page ? css.active : undefined}>
          <Link href={buildHref(p)} prefetch={false}>
            {p}
          </Link>
        </li>
      ))}
    </ul>
  );
}
