'use client';

import { useEffect, useState } from 'react';
import InputModal from '@/components/InputModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <InputModal />;
};

export default ModalProvider;
