import { useEffect, useRef } from 'react';
import { MdOutlineDelete, MdOutlineEditNote } from 'react-icons/md';

import { NoteType } from '@/types';
import useOptionModal from '@/utils/useOptionModal';

interface OptionsModalProps {
  isOpen?: boolean;
  onChange?: () => void;
  note: NoteType;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  isOpen,
  onChange,
  note,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    noteIdActivedOptions,
    noteIdEdited,
    noteIdDeleted,
    setNoteIdEdited,
    setNoteIdDeleted,
    reset,
  } = useOptionModal();

  const handleEditedClick = () => {
    reset();
    setNoteIdEdited(noteIdEdited, note._id, note);
    console.log(noteIdEdited);
  };
  const handleDeletedClick = () => {
    reset();
    setNoteIdDeleted(noteIdDeleted, note._id, note);
    console.log(noteIdDeleted);
  };

  // Close modal when click outside
  useEffect(() => {
    if (isOpen && onChange) {
      const handleFocus = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onChange();
        }
      };

      document.addEventListener('click', handleFocus);

      return () => {
        document.removeEventListener('click', handleFocus);
      };
    }
  }, [modalRef, noteIdActivedOptions, isOpen, onChange]);

  return (
    <div
      ref={modalRef}
      className={`
        ${isOpen ? 'flex flex-col' : 'hidden'}
        p-1
        min-w-[100px]
        max-w-[200px]
        bg-white
        border
        rounded-md
        drop-shadow-md
        z-1
      `}
    >
      {/* Edit */}
      <div
        onClick={handleEditedClick}
        className="
          flex
          px-2
          py-1
          items-center
          justify-start
          gap-x-2
          text-neutral-500
          hover:bg-neutral-200/50
          transition
          rounded-sm
        "
      >
        <MdOutlineEditNote size={18} />
        <p>Edit</p>
      </div>

      {/* Delete */}
      <div
        onClick={handleDeletedClick}
        className="
          flex
          px-2
          py-1
          items-center
          justify-start
          gap-x-2
          text-neutral-500
          hover:bg-neutral-200/50
          transition
          rounded-sm
        "
      >
        <MdOutlineDelete size={18} />
        <p>Delete</p>
      </div>
    </div>
  );
};

export default OptionsModal;
