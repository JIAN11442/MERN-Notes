import useInputModal from '@/utils/useInputModal';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

const InputModal = () => {
  const inputModal = useInputModal();
  const router = useRouter();
  const onChange = () => {
    inputModal.close();
    // router.refresh();
  };

  return (
    <Modal isOpen={inputModal.isOpen} onChange={onChange} title="Add Note">
      Form
    </Modal>
  );
};

export default InputModal;
