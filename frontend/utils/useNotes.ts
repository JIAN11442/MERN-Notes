import { NoteIdActivedOptions, NoteIdCollapsed, NoteType } from "@/types";
import { create } from "zustand";

interface useNotesProps {
  notes: NoteType[];
  noteIdCollapsed: NoteIdCollapsed[];
  noteIdActivedOptions: NoteIdActivedOptions[];

  setNotes: (notes: NoteType[]) => void;
  setNoteIdCollapsed: (
    noteIdCollapsed?: NoteIdCollapsed[],
    targetId?: string
  ) => void;
  setNoteIdOptions: (
    noteIdActivedOptions?: NoteIdActivedOptions[],
    targetId?: string
  ) => void;
}

const useNotes = create<useNotesProps>((set) => ({
  notes: [],
  noteIdCollapsed: [],
  noteIdActivedOptions: [],

  setNotes: (notes: NoteType[]) => set({ notes: notes }),
  setNoteIdCollapsed: (
    noteIdCollapsed?: NoteIdCollapsed[],
    targetId?: string
  ) => {
    // 當輸入的值符合 noteIdCollapsed 的格式時，直接設定，但如果不符合，則要先判斷是否有 targetId，有的話要以改變當前targetId的collapsed狀態
    if (noteIdCollapsed && noteIdCollapsed.length > 0) {
      if (targetId) {
        const targetIndex = noteIdCollapsed.findIndex(
          (item: NoteIdCollapsed) => item._id === targetId
        );
        if (targetIndex !== -1) {
          noteIdCollapsed[targetIndex].collapsed =
            !noteIdCollapsed[targetIndex].collapsed;
        }
      }
      set({ noteIdCollapsed: noteIdCollapsed });
    } else {
      set({ noteIdCollapsed: noteIdCollapsed });
    }
  },
  setNoteIdOptions: (
    noteIdActivedOptions?: NoteIdActivedOptions[],
    targetId?: string
  ) => {
    if (noteIdActivedOptions && noteIdActivedOptions.length > 0) {
      if (targetId) {
        const targetIndex = noteIdActivedOptions.findIndex(
          (item: NoteIdActivedOptions) => item._id === targetId
        );
        if (targetIndex !== -1) {
          noteIdActivedOptions[targetIndex].activedOptions =
            !noteIdActivedOptions[targetIndex].activedOptions;
        }
      }
      set({ noteIdActivedOptions: noteIdActivedOptions });
    } else {
      set({ noteIdActivedOptions: noteIdActivedOptions });
    }
  },
}));

export default useNotes;
