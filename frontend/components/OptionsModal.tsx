import { MdOutlineDelete, MdOutlineEditNote } from "react-icons/md";

interface OptionsModalProps {
  isOpen?: boolean;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ isOpen }) => {
  return (
    <div
      className={`
        absolute
        top-5
        right-2
        ${isOpen ? "flex" : "hidden"}
        flex-col
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
