import useNotes from '@/utils/useNotes';
import Button from './Button';
import WarningModal from './WarningModal';

import * as NotesApi from '@/fetchApi/notes.api';
import useOptionModal from '@/utils/useOptionModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const DeleteModal = () => {
  const { notes, setNotes } = useNotes();
  const router = useRouter();
  const { reset, deleteModalClose, deleteModalOpenState } = useOptionModal();

  // Handel close modal when click outside
  const onChange = () => {
    deleteModalClose();
  };

  const handleDelete = async () => {
    try {
      if (deleteModalOpenState?.note) {
        // Delete note from database
        const response = await NotesApi.deleteNote(
          deleteModalOpenState.note._id
        );
        console.log(response);

        // Delete note from notes state
        const newNotes = notes.filter(
          (note) => note._id !== deleteModalOpenState.note?._id
        );
        setNotes(newNotes);

        toast.success('Note deleted successfully');

        reset();
        onChange();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <WarningModal
      isOpen={!!deleteModalOpenState?.isDeleted}
      onChange={onChange}
      title="Delete Note ?"
    >
      <div
        className="
          flex
          flex-col
          gap-y-10
        "
      >
        {/* Statement */}
        <div className="text-center font-medium">
          <p>
            Are you sure you want to delete{' '}
            <span className="font-semibold text-red-500">
              &quot;{deleteModalOpenState?.note?.title}&quot;
            </span>{' '}
            ?
          </p>
          <p>You can&apos;t undo this action.</p>
        </div>

        {/* Operator Button */}
        <div
          className="
            flex
            gap-x-2
            justify-center
          "
        >
          {/* Delete Button */}
          <Button
            onClick={handleDelete}
            className="
              py-2
              rounded-md
              text-white
              bg-red-500
          "
          >
            Delete
          </Button>

          {/* Cancel Button */}
          <Button
            onClick={onChange}
            className="
              py-2
              rounded-md
              bg-neutral-200
            "
          >
            Cancel
          </Button>
        </div>
      </div>
    </WarningModal>
  );
};

export default DeleteModal;
