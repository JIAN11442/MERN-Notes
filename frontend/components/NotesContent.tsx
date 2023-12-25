'use client';

import { useEffect } from 'react';

import Button from './Button';
import NoteItem from './NoteItem';
import * as NotesApi from '../fetchApi/notes.api';

import { NoteType } from '@/types';
import useNotes from '@/utils/useNotes';
import useInputModal from '@/utils/useInputModal';
import useOptionModal from '@/utils/useOptionModal';

const NotesContent = () => {
  const { notes, setNotes, setNoteIdCollapsed } = useNotes();
  const { setNoteIdOptions, reset } = useOptionModal();
  const inputModal = useInputModal();

  // Fetch All Notes && Collapse
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
        setNoteIdCollapsed([
          ...notes.map((note: NoteType) => {
            return { _id: note._id, collapsed: false };
          }),
        ]);
        setNoteIdOptions([
          ...notes.map((note: NoteType) => {
            return { _id: note._id, activedOptions: false };
          }),
        ]);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    loadNotes();
  }, [setNoteIdCollapsed, setNoteIdOptions, setNotes]);

  return (
    <div className="flex flex-col">
      <Button
        onClick={() => {
          inputModal.open();
          reset();
        }}
        className="
          flex-block
          mb-4
          ml-auto
          mr-auto
          py-2
          text-white
          rounded-lg
        "
      >
        Add a note
      </Button>
      <div
        className="
          grid
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-3
          px-10
        "
      >
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesContent;
