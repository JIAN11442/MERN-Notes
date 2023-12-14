import { NoteType } from '@/types';
import { create } from 'zustand';

interface useNotesProps {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
}

const useNotes = create<useNotesProps>((set) => ({
  notes: [],
  setNotes: (notes: NoteType[]) => set({ notes: notes }),
}));

export default useNotes;
