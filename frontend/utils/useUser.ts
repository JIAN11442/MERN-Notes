import { UserType } from '@/types';
import { create } from 'zustand';

interface useUserProps {
  loginOpen: boolean;
  signupOpen: boolean;
  authenticatedUser: UserType | null;
  signupUser: UserType | null;
  loginUser: UserType | null;

  signup: () => void;
  login: () => void;
  close: () => void;
  setAuthenticatedUser: (user: UserType | null) => void;
  setSignupUser: (user: UserType | null) => void;
  setLoginUser: (user: UserType | null) => void;
}

const useUser = create<useUserProps>((set) => ({
  loginOpen: false,
  signupOpen: false,
  authenticatedUser: null,
  signupUser: null,
  loginUser: null,

  signup: () => set({ loginOpen: false, signupOpen: true }),
  login: () => set({ loginOpen: true, signupOpen: false }),
  close: () => set({ loginOpen: false, signupOpen: false }),
  setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
  setSignupUser: (user) => set({ signupUser: user }),
  setLoginUser: (user) => set({ loginUser: user }),
}));

export default useUser;
