'use client';

import { useEffect } from 'react';

interface BootstrapProps {
  children: React.ReactNode;
}

const BootstrapClient: React.FC<BootstrapProps> = ({ children }) => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <div>{children}</div>;
};

export default BootstrapClient;
