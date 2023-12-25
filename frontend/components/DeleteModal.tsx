import useOptionModal from '@/utils/useOptionModal';
import WarningModal from './WarningModal';

const DeleteModal = () => {
  const { reset } = useOptionModal();
  const onChange = () => {
    reset();
  };

  return (
    <WarningModal isOpen={true} onChange={onChange}>
      Warning
    </WarningModal>
  );
};

export default DeleteModal;
