"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { NoteList } from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { fetchNotesPage } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";
import css from "./NotesPage.module.css";

const PER_PAGE = 8;

type NotesClientProps = {
  filterTag?: NoteTag;
};

export function NotesClient({ filterTag }: NotesClientProps) {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const [search, setSearch] = useState("");

  const listQueryKey = useMemo(
    () => ["notes", { page, tag: filterTag, search, perPage: PER_PAGE }],
    [page, filterTag, search],
  );

  const query = useQuery({
    queryKey: listQueryKey,
    queryFn: () =>
      fetchNotesPage({
        page,
        perPage: PER_PAGE,
        tag: filterTag,
        search,
      }),
    placeholderData: keepPreviousData,
  });

  const buildHref = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }
    const qs = params.toString();
    const base = filterTag
      ? `/notes/filter/${encodeURIComponent(filterTag)}`
      : "/notes";
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      {query.isLoading ? (
        <p>Loading notes…</p>
      ) : query.isError ? (
        <p role="alert">Could not load notes.</p>
      ) : (
        <>
          <NoteList notes={query.data?.notes ?? []} />
          <Pagination
            page={page}
            totalPages={query.data?.totalPages ?? 1}
            buildHref={buildHref}
          />
        </>
      )}
    </div>
  );
}
