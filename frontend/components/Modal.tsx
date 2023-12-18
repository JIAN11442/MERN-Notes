import { IoMdClose } from 'react-icons/io';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
  className,
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
            rounded-md
            w-[450px]
            max-w-[90wv]
            h-auto
            hover:outline-none
            focus:outline-none
          "
        >
          <div
            className={twMerge(
              `
              flex
              p-3
              items-start
              justify-between
              border-b
              border-neutral-200/50
              mb-3
            `,
              className
            )}
          >
            <Dialog.Title
              className="
                flex
                text-xl
                font-bold
              "
            >
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="
                p-1
                text-neutral-500
                hover:bg-neutral-200
                rounded-full
                transition
              "
              >
                <IoMdClose size={18} />
              </button>
            </Dialog.Close>
          </div>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
