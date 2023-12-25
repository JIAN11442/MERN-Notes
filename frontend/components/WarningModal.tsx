import * as Dialog from '@radix-ui/react-dialog';

interface DeleteModalProps {
  isOpen: boolean;
  onChange: () => void;
  children: React.ReactNode;
}

const WarningModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onChange,
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
            border
            border-neutral-200
            rounded-md
            p-3
          "
        >
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WarningModal;
