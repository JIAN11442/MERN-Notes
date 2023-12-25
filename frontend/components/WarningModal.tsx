import { IoMdClose } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import * as Dialog from "@radix-ui/react-dialog";

interface DeleteModalProps {
  isOpen: boolean;
  onChange: () => void;
  title?: string;
  children: React.ReactNode;
}

const WarningModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onChange,
  title,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            bg-neutral-900/50
          "
        />
        <Dialog.Content
          className="
            fixed
            translate-x-[-50%]
            translate-y-[-50%]
            left-[50%]
            top-[50%]
            bg-white
            px-5
            py-4
            border
            border-neutral-200
            rounded-md
            min-w-[450px]
            max-w-[90vw]
            focus:outline-none
          "
        >
          {/* Warning Icon */}
          <div>
            <TiDeleteOutline
              size={100}
              className="
                text-red-500
                mx-auto
                mb-3
              "
            />
          </div>
          <Dialog.Title
            className="
              text-center
              text-lg
              font-semibold
              mb-3
            "
          >
            {title}
          </Dialog.Title>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className={`
                absolute
                top-2
                right-3
                p-1
                text-neutral-500
                hover:bg-neutral-200
                rounded-full
                transition
              `}
            >
              <IoMdClose size={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WarningModal;
