import { UserType } from '@/types';
import { fetchData } from './notes.api';

// Get logged in user
export const getLoggedInUser = async (): Promise<UserType> => {
  const response = await fetchData('http://localhost:5000/api/users', {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

// Sign up
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const signup = async (
  credentials: SignUpCredentials
): Promise<UserType> => {
  const response = await fetchData('http://localhost:5000/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Log in
export interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<UserType> => {
  const response = await fetchData('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Log out
export const logout = async () => {
  await fetchData('http://localhost:5000/api/users/logout', { method: 'POST' });
};
