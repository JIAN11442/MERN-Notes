'use client';

import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import NoteItem from './NoteItem';
import * as NoteApi from '../fetchApi/notes.api';

import { NoteType } from '@/types';
import useNotes from '@/utils/useNotes';

const NotesContent = () => {
  const { notes, setNotes, setNoteIdCollapsed } = useNotes();

  // Fetch All Notes && Collapse
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NoteApi.fetchNotes();
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
    <Container
      className="
        grid
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-3
        p-4
      "
    >
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </Container>
  );
};

export default NotesContent;
