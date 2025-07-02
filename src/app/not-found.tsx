'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useNotFound } from '../context/NotFoundContext';
import commonStyles from '../app/common-page.module.css';

export default function NotFound() {
  const { setNotFound } = useNotFound();

  useEffect(() => {
    setNotFound(true);
    return () => setNotFound(false); // Clean up on unmount
  }, [setNotFound]);

  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>Not Found</h1>
      <p className={commonStyles.pageContent}>Could not find requested resource</p>
      <p className={commonStyles.pageContent}>
        <Link href="/">Home</Link>
      </p>
    </div>
  );
}