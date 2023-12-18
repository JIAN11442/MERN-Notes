'use client';

import useNotes from '@/hooks/useNotes';
import { useEffect } from 'react';
import NoteItem from './NoteItem';
import { Container } from 'react-bootstrap';
import { NoteType } from '@/types';

const NotesContent = () => {
  const { notes, setNotes, noteIdCollapsed, setNoteIdCollapsed } = useNotes();

  // Fetch All Notes && Collapse
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notes/', {
          method: 'GET',
        });
        const notes = await response.json();
        console.log(notes);
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
    </div>
  );
};

export default NotesContent;
