'use client';

import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Button from './Button';
import NoteItem from './NoteItem';
import * as NotesApi from '../fetchApi/notes.api';

import { NoteType } from '@/types';
import useNotes from '@/utils/useNotes';
import useInputModal from '@/utils/useInputModal';

const NotesContent = () => {
  const { notes, setNotes, setNoteIdCollapsed } = useNotes();
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
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <div
      className="
        pt-10
        flex
        flex-col
        items-center
        justify-center
      "
    >
      <Button
        onClick={() => inputModal.open()}
        className="
          flex
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
        py-4
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
