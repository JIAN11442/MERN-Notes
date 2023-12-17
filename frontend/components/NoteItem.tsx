import { NoteType } from "@/types";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import "../styles/scrollbar.css";

interface NoteItemProps {
  note: NoteType;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  return (
    <div
      className="
        flex
        flex-col
        p-3
        gap-y-3
        min-h-[200px]
        overflow-y-auto
        border
        rounded-md
        bg-cornsilk
        hover:shadow-md
        transition
        custom-scrollbar
        cursor-pointer
      "
    >
      <div
        className="
          text-md
          font-semibold
        "
      >
        {note.title}
      </div>
      <div
        className="
        text-sm
          whitespace-pre-line
        "
      >
        {note.content}
      </div>
    </div>
  );
};

export default NoteItem;
