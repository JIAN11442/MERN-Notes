import { create } from 'zustand';

interface useUserProps {
  isOpen: boolean;
  isLogin: boolean;
  isSignUp: boolean;
  signup: () => void;
  login: () => void;
  close: () => void;
}

const useUser = create<useUserProps>((set) => ({
  isOpen: false,
  isLogin: false,
  isSignUp: false,
  signup: () => set({ isOpen: true, isLogin: false, isSignUp: true }),
  login: () => set({ isOpen: true, isLogin: true, isSignUp: false }),
  close: () => set({ isOpen: false, isLogin: false, isSignUp: false }),
}));

export default useUser;
