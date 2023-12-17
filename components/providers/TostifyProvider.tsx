import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProvidersProps {
    children: ReactNode;
  }

const ToastProvider: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastProvider;