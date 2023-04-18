import React, { useState } from 'react';

import styles from './CopyButton.module.css';

const CopyButton = ({ buttonText, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = buttonText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onCopy();
  };

  return (
    <>
      <button className={`${styles.copyButton} transition duration-200`} onClick={copyTextToClipboard}>
        Copy Text
      </button>
      {isCopied && <span className={styles.copiedText}>Copied to clipboard</span>}
    </>
  );
};

export default CopyButton;
