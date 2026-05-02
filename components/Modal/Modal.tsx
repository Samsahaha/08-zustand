"use client";

import type { ReactNode } from "react";
import css from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  closeLabel?: string;
  /** id елемента заголовка для aria-labelledby */
  labelledBy?: string;
};

export function Modal({
  children,
  onClose,
  closeLabel = "Close",
  labelledBy,
}: ModalProps) {
  return (
    <div
      className={css.backdrop}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={css.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={css.close}
          onClick={onClose}
        >
          {closeLabel}
        </button>
        {children}
      </div>
    </div>
  );
}
