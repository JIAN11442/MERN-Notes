'use client';

import useNotes from '@/hooks/useNotes';
import { useEffect } from 'react';

const Notes = () => {
  const { notes, setNotes } = useNotes();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notes/', {
          method: 'GET',
        });
        console.log(response);
        const notes = await response.json();
        setNotes(notes);
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
        p-4
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
    >
      {notes.map((note) => (
        <div
          key={note._id}
          className="
            flex
            flex-col
            w-full
            gap-y-4
            bg-neutral-900
            hover:bg-neutral-900/0.5
            text-neutral-400
            hover:scale-[1.01]
            p-4
            rounded-lg
            transition
            cursor-pointer
          "
        >
          <div>{note.title}</div>
          <div>{note.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Notes;
