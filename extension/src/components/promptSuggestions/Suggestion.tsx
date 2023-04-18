import React from 'react';

import globalStyles from '../GlobalStyles.module.css';
import CopyButton from '../general/CopyButton';
import styles from './Suggestion.module.css';

const CustomComponent = ({ mainText, buttonText }) => {
  const handleCopy = () => {
    // Add any additional logic to be executed after copying
  };

  return (
    <div className={`${styles.container} mt-4`}>
      <p className={styles.text}>{mainText}</p>
      <div className={styles.buttonContainer}>
        <p className={styles.text}>{buttonText}</p>
      </div>
      <CopyButton buttonText={buttonText} onCopy={handleCopy} />
    </div>
  );
};

export default CustomComponent;
