import { create } from 'zustand';

interface useUserProps {
  isOpen: boolean;
  isLogin: boolean;
  isSignUp: boolean;
  signup: () => void;
  login: () => void;
}

const useUser = create<useUserProps>((set) => ({
  isOpen: false,
  isLogin: false,
  isSignUp: false,
  signup: () => set({ isOpen: true, isLogin: false, isSignUp: true }),
  login: () => set({ isOpen: true, isLogin: true, isSignUp: false }),
}));

export default useUser;
