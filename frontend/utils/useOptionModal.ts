import { create } from 'zustand';
import {
  NoteIdActivedOptions,
  NoteIdDeleted,
  NoteIdEdited,
  NoteType,
} from '@/types';

interface optionModalProps {
  noteIdActivedOptions: NoteIdActivedOptions[];
  noteIdEdited: NoteIdEdited[];
  noteIdDeleted: NoteIdDeleted[];

  setNoteIdOptions: (
    noteIdActivedOptions?: NoteIdActivedOptions[],
    targetId?: string
  ) => void;
  setNoteIdEdited: (
    noteIdEdited?: NoteIdEdited[],
    targetId?: string,
    noteContent?: NoteType
  ) => void;
  setNoteIdDeleted: (
    noteIdDeleted?: NoteIdDeleted[],
    targetId?: string,
    noteContent?: NoteType
  ) => void;

  reset: () => void;
}

const useOptionModal = create<optionModalProps>((set, get) => ({
  noteIdActivedOptions: [],
  noteIdEdited: [],
  noteIdDeleted: [],

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
  setNoteIdEdited: (
    noteIdEdited?: NoteIdEdited[],
    targetId?: string,
    noteContent?: NoteType
  ) => {
    if (noteIdEdited && noteIdEdited.length > 0) {
      if (targetId) {
        const targetIndex = noteIdEdited.findIndex(
          (item: NoteIdEdited) => item._id === targetId
        );
        if (targetIndex !== -1) {
          noteIdEdited[targetIndex].isEdited =
            !noteIdEdited[targetIndex].isEdited;
          noteIdEdited[targetIndex].noteContent = noteContent as NoteType;
        }
      }
      set({ noteIdEdited: noteIdEdited });
    } else {
      set({ noteIdEdited: noteIdEdited });
    }
  },
  setNoteIdDeleted: (
    noteIdDeleted?: NoteIdDeleted[],
    targetId?: string,
    noteContent?: NoteType
  ) => {
    if (noteIdDeleted && noteIdDeleted.length > 0) {
      if (targetId) {
        const targetIndex = noteIdDeleted.findIndex(
          (item: NoteIdDeleted) => item._id === targetId
        );
        if (targetIndex !== -1) {
          noteIdDeleted[targetIndex].isDeleted =
            !noteIdDeleted[targetIndex].isDeleted;
          noteIdDeleted[targetIndex].noteContent = noteContent as NoteType;
        }
      }
      set({ noteIdDeleted: noteIdDeleted });
    } else {
      set({ noteIdDeleted: noteIdDeleted });
    }
  },

  reset: () => {
    const { noteIdActivedOptions, noteIdEdited, noteIdDeleted } = get();

    if (noteIdActivedOptions) {
      const resetNoteIdActivedOptions = [...noteIdActivedOptions];
      resetNoteIdActivedOptions.forEach((item) => {
        item.activedOptions = false;
      });
      set({ noteIdActivedOptions: resetNoteIdActivedOptions });
    }
    if (noteIdEdited) {
      const resetNoteIdEdited = [...noteIdEdited];
      resetNoteIdEdited.forEach((item) => {
        item.isEdited = false;
      });
      set({ noteIdEdited: resetNoteIdEdited });
    }
    if (noteIdDeleted) {
      const resetNoteIdDeleted = [...noteIdDeleted];
      resetNoteIdDeleted.forEach((item) => {
        item.isDeleted = false;
      });
      set({ noteIdDeleted: resetNoteIdDeleted });
    }
  },
}));

export default useOptionModal;
