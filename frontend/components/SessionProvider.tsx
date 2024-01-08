'use client';

import { useEffect } from 'react';

import * as UsersApi from '@/fetchApi/users.api';
import useUser from '@/utils/useUser';

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const { setAuthenticatedUser } = useUser();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUser = await UsersApi.getLoggedInUser();
        setAuthenticatedUser(loggedInUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoggedInUser();
  }, []);

  return <div>{children}</div>;
};

export default SessionProvider;
