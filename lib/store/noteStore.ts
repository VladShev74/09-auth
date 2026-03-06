import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

type Draft = {
  title: string,
  content: string,
  tag: NoteTag,
};

type DraftStore = {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
};

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};


export const useDraftStore = create<DraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft' }
  )
);