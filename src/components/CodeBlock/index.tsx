'use client';

import { useState } from 'react';
import styles from './styles.module.css';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ inline, className, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const match = /language-(\w+)(:(.*))?/.exec(className || '');
  const language = match?.[1];
  const fileName = match?.[3];

  const handleCopy = () => {
    const codeToCopy = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(codeToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (inline) {
    return <code className={className}>{children}</code>;
  }

  return (
    <div className={styles.codeBlockContainer}>
      {fileName && (
        <div className={styles.codeBlockHeader}>
          <span className={styles.fileName}>{fileName}</span>
          <button onClick={handleCopy} className={styles.copyButton}>
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className={styles.codeBlock}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
