"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  );
}

export default Providers;