"use client";

import css from "./SearchBox.module.css";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBox({
  value,
  onChange,
  placeholder = "Search notes…",
}: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search notes"
    />
  );
}
