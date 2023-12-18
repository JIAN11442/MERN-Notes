import { create } from 'zustand';

interface InputModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useInputModal = create<InputModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useInputModal;
