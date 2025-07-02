'use client';

import { useEffect } from 'react';
import { useNotFound } from '../../context/NotFoundContext';

const SetNotFound = () => {
  const { setNotFound } = useNotFound();

  useEffect(() => {
    setNotFound(true);
    // Cleanup function to reset the state when the component unmounts
    return () => {
      setNotFound(false);
    };
  }, [setNotFound]);

  return null; // This component does not render anything
};

export default SetNotFound;
