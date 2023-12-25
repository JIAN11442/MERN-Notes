import { create } from 'zustand';

import { NoteIdCollapsed, NoteType } from '@/types';

interface useNotesProps {
  notes: NoteType[];
  noteIdCollapsed: NoteIdCollapsed[];

  setNotes: (notes: NoteType[]) => void;
  setNoteIdCollapsed: (
    noteIdCollapsed?: NoteIdCollapsed[],
    targetId?: string
  ) => void;
}

const useNotes = create<useNotesProps>((set) => ({
  notes: [],
  noteIdCollapsed: [],

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
}));

export default useNotes;
