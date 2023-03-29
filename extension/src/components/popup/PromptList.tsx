import React from 'react';

import Prompt from './Prompt.tsx';
import styles from './PromptList.module.css';

interface ExpandableListProps {
  items: {
    [promptName: string]: {
      prompt: string;
      tags: {
        title: string;
        color: string;
      }[];
    };
  };
}

const ExpandableList: React.FC<ExpandableListProps> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {Object.entries(items).map(([promptName, prompt], index) => (
        <Prompt key={index} promptName={promptName} prompt={prompt} />
      ))}
    </ul>
  );
};

export default ExpandableList;
