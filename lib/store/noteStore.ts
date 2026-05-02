import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
} as const satisfies { title: string; content: string; tag: NoteTag };

export type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: { ...initialDraft },
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: { ...initialDraft } }),
    }),
    {
      name: "notehub-note-draft",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
