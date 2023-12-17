"use client";

import useNotes from "@/hooks/useNotes";
import { useEffect } from "react";
import NoteItem from "./NoteItem";
import { Container } from "react-bootstrap";

const NotesContent = () => {
  const { notes, setNotes } = useNotes();

  // Fetch All Notes
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes/", {
          method: "GET",
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
    <Container
      className="
        grid
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-3
        py-4
      "
    >
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </Container>
  );
};

export default NotesContent;
