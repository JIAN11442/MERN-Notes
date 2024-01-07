"use client";

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import Button from "./Button";
import NoteItem from "./NoteItem";

import * as NotesApi from "../fetchApi/notes.api";

import { NoteType } from "@/types";
import useNotes from "@/utils/useNotes";
import useInputModal from "@/utils/useInputModal";
import useOptionModal from "@/utils/useOptionModal";

const NotesContent = () => {
  const { notes, setNotes, setNoteIdCollapsed } = useNotes();
  const { setNoteIdOptions, OptionsModalReset } = useOptionModal();
  const inputModal = useInputModal();
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  // Fetch All Notes && Collapse
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);

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
        console.error(error);
        alert(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, [setNoteIdCollapsed, setNoteIdOptions, setNotes]);

  const noteGrids = (
    <div
      className="
        grid
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-3
        px-10
        pb-10
      "
    >
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );

  return (
    <div
      className="
        flex
        flex-col
      "
    >
      {/* Add Note Button */}
      <Button
        onClick={() => {
          inputModal.open();
          OptionsModalReset();
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

      {/* Notes Content */}
      {notesLoading && (
        <div
          className="
            flex-block
            mr-auto
            ml-auto
          "
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {showNotesLoadingError && (
        <p className="text-center text-medium">
          Something went wrong. Please refresh the page.
        </p>
      )}
      {!notesLoading && !showNotesLoadingError && notes && (
        <>
          {notes.length > 0 ? (
            noteGrids
          ) : (
            <p className="text-center text-medium">
              You don&apos;t have any notes yet
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default NotesContent;
