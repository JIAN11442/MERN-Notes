import { useRef } from 'react';

import { NoteType } from '@/types';
import useNotes from '@/utils/useNotes';
import CreatedUpdatedDate from '@/utils/formatData';

import '../styles/noteCard.css';
import '../styles/scrollbar.css';

interface NoteItemProps {
  note: NoteType;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { noteIdCollapsed, setNoteIdCollapsed } = useNotes();
  const textRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const overflowY = () => {
    if (noteRef.current && textRef.current) {
      const noteHeight = noteRef.current?.clientHeight;
      const textHeight = textRef.current?.scrollHeight;

      return textHeight > noteHeight;
    }
  };
  const currNoteIdCollapsed = noteIdCollapsed.filter(
    (item) => item._id === note._id
  )[0].collapsed;

  const formatDate = CreatedUpdatedDate(note.createdAt, note.updatedAt);

  return (
    <div
      onClick={() => setNoteIdCollapsed(noteIdCollapsed, note._id)}
      className={`
        flex
        flex-col
        min-h-[200px]
        max-h-[350px]
        bg-cornsilk-100
        border-1
        rounded-md
        shadow-md
        cursor-pointer
        gap-y-2
        hover:scale-[1.02]
        hover:shadow-lg
        transition
      `}
    >
      {/* Title */}
      <div
        className={`
          flex
          flex-shrink-0
          px-3
          py-2
          bg-gradient-to-r
          from-cornsilk-500
          text-md
          font-semibold
          w-full
          truncate 
        `}
      >
        {note.title}
      </div>

      {/* Content */}
      <div
        ref={noteRef}
        className={`
          flex
          flex-grow
          px-3
          w-full
          overflow-hidden
          ${
            overflowY() && currNoteIdCollapsed === false
              ? 'custom-mask-image'
              : 'overflow-y-auto custom-scrollbar'
          }
        `}
      >
        <div
          ref={textRef}
          className={`
            flex-1
            text-sm
            text-neutral-600
            whitespace-pre-line
          `}
        >
          {note.content}
        </div>
      </div>
      {/* Timestamp */}
      <div
        className={`
          flex
          flex-shrink-0
          px-3
          pt-2
          pb-2
          items-center
          justify-end
          bg-gradient-to-l
          from-cornsilk-300
          text-[11px]
        `}
      >
        {formatDate}
      </div>
    </div>
  );
};

export default NoteItem;
