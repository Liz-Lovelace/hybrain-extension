import React from 'react';

import styles from './Prompt.module.css';
import { callBackgroundScript, callContentScript } from '/src/lib/messagingApi.ts';

function Prompt({ promptName, prompt }) {
  return (
    <li
      className={styles.listItem}
      onClick={async () => {
        await callContentScript('apply template', prompt.prompt);
      }}>
      {promptName}
    </li>
  );
}

export default Prompt;
