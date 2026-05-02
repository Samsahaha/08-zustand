"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { NoteList } from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { fetchNotesPage } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import notesPageCss from "../../NotesPage.module.css";

const PER_PAGE = 8;
const SEARCH_DEBOUNCE_MS = 400;

export type NotesProps = {
  filterTag?: NoteTag;
};

export function Notes({ filterTag }: NotesProps) {
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const listQueryKey = useMemo(
    () => [
      "notes",
      { page, tag: filterTag, search: debouncedSearch, perPage: PER_PAGE },
    ],
    [page, filterTag, debouncedSearch],
  );

  const query = useQuery({
    queryKey: listQueryKey,
    queryFn: () =>
      fetchNotesPage({
        page,
        perPage: PER_PAGE,
        tag: filterTag,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }
    const qs = params.toString();
    const base = filterTag
      ? `/notes/filter/${encodeURIComponent(filterTag)}`
      : "/notes";
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <div className={notesPageCss.app}>
      <div className={notesPageCss.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />
        <Link className={notesPageCss.button} href="/notes/action/create">
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
            buildHref={buildPageHref}
          />
        </>
      )}
    </div>
  );
}
