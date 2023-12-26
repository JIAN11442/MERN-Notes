import { useRef } from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

import OptionsModal from './OptionsModal';

import { NoteIdActivedOptions, NoteType } from '@/types';
import useNotes from '@/utils/useNotes';
import useOptionModal from '@/utils/useOptionModal';
import CreatedUpdatedDate from '@/utils/formatData';

import '../styles/noteCard.css';
import '../styles/scrollbar.css';

interface NoteItemProps {
  note: NoteType;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { noteIdCollapsed, setNoteIdCollapsed } = useNotes();
  const { noteIdActivedOptions, setNoteIdOptions, OptionsModalReset } =
    useOptionModal();
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
  )[0]?.collapsed;

  const formatDate = CreatedUpdatedDate(note.createdAt, note.updatedAt);
  const handleOptionModalIsOpen = () => {
    if (noteIdActivedOptions) {
      const isOpen = noteIdActivedOptions.filter(
        (item: NoteIdActivedOptions) => item._id === note._id
      )[0]?.activedOptions;

      return isOpen;
    }
  };
  const handleOptionsOnChange = () => {
    OptionsModalReset();
  };

  return (
    <div
      className={`
        flex
        flex-col
        min-w-[300px]
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
      {/* Title  && Options*/}
      <div
        className="
          relative
          flex
          flex-shrink-0
          px-3
          py-2
          items-center
          justify-between
          bg-gradient-to-r
          from-cornsilk-500
        "
      >
        {/* Title */}
        <div
          className={`
            flex-1
            w-full
            text-md
            font-semibold
            truncate
          `}
        >
          {note.title}
        </div>

        {/* Options */}
        <div
          className="
            group
            relative
            flex
            pl-4
            h-full
            items-center
            justify-center
          "
        >
          <SlOptionsVertical
            onClick={() => {
              OptionsModalReset();
              setNoteIdOptions(noteIdActivedOptions, note._id);
            }}
            size={15}
            className="
              text-neutral-500/80
              group-hover:text-neutral-500
              group-hover:scale-[1.1]
              transition
            "
          />
          <div
            className="
              absolute
              top-0
              right-0
              z-1
            "
          >
            <OptionsModal
              isOpen={handleOptionModalIsOpen()}
              onChange={handleOptionsOnChange}
              note={note}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        onClick={() => {
          OptionsModalReset();
          setNoteIdCollapsed(noteIdCollapsed, note._id);
        }}
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
            font-medium
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
