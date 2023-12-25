import { create } from "zustand";
import {
  NoteIdActivedOptions,
  NoteIsDeleted,
  NoteIsEdited,
  NoteType,
} from "@/types";

interface optionModalProps {
  noteIdActivedOptions: NoteIdActivedOptions[];
  editModalOpenState: NoteIsEdited | null;
  deleteModalOpenState: NoteIsDeleted | null;

  setNoteIdOptions: (
    noteIdActivedOptions?: NoteIdActivedOptions[],
    targetId?: string
  ) => void;
  editModalOpen: (targetNote: NoteType) => void;
  editModalClose: () => void;
  deleteModalOpen: (targetNote: NoteType) => void;
  deleteModalClose: () => void;

  reset: () => void;
}

const useOptionModal = create<optionModalProps>((set, get) => ({
  noteIdActivedOptions: [],
  editModalOpenState: { isEdited: false, note: null },
  deleteModalOpenState: { isDeleted: false, note: null },

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
  editModalOpen: (targetNote) =>
    set({ editModalOpenState: { isEdited: true, note: targetNote } }),
  editModalClose: () => set({ editModalOpenState: null }),
  deleteModalOpen: (targetNote) =>
    set({ deleteModalOpenState: { isDeleted: true, note: targetNote } }),
  deleteModalClose: () => set({ deleteModalOpenState: null }),

  reset: () => {
    const { noteIdActivedOptions } = get();

    if (noteIdActivedOptions) {
      const resetNoteIdActivedOptions = [...noteIdActivedOptions];
      resetNoteIdActivedOptions.forEach((item) => {
        item.activedOptions = false;
      });
      set({ noteIdActivedOptions: resetNoteIdActivedOptions });
    }
  },
}));

export default useOptionModal;
