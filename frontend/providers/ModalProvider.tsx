'use client';

import { useEffect, useState } from 'react';
import InputModal from '@/components/InputModal';
import DeleteModal from '@/components/DeleteModal';
import SignUpModal from '@/components/SignUpModal';
import LoginModal from '@/components/LoginModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <InputModal />
      <DeleteModal />
      <SignUpModal />
      <LoginModal />
    </>
  );
};

export default ModalProvider;
