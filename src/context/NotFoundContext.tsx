'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotFoundContextType {
  isNotFound: boolean;
  setNotFound: (status: boolean) => void;
}

const NotFoundContext = createContext<NotFoundContextType | undefined>(undefined);

export const NotFoundProvider = ({ children }: { children: ReactNode }) => {
  const [isNotFound, setIsNotFound] = useState(false);

  const setNotFound = (status: boolean) => {
    setIsNotFound(status);
  };

  return (
    <NotFoundContext.Provider value={{ isNotFound, setNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
};

export const useNotFound = () => {
  const context = useContext(NotFoundContext);
  if (context === undefined) {
    throw new Error('useNotFound must be used within a NotFoundProvider');
  }
  return context;
};