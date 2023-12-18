import { IoMdClose } from 'react-icons/io';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
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
            border
            border-neutral-700
            bg-white
            translate-x-[-50%]
            translate-y-[-50%]
            top-[50%]
            left-[50%]
            p-[25px]
            rounded-md
            w-[450px]
            max-w-[90wv]
            h-auto
            hover:outline-none
            focus:outline-none
          "
        >
          <Dialog.Title
            className="
              text-xl
              font-bold
              mb-4
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className={`
              ${description ? 'flex' : 'hidden'}
              text-sm
              font-light
              mb-5
            `}
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
              "
            >
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
