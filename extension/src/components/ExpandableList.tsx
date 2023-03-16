import React from 'react';

import styles from './ExpandableList.module.css';

interface ExpandableListProps {
  items: string[];
}

const ExpandableList: React.FC<ExpandableListProps> = ({ items, promptChooserFunction }) => {
  return (
    <ul className={styles.list}>
      {Object.entries(items).map(([promptName, prompt], index) => (
        <li
          key={index}
          className={styles.listItem}
          onClick={() => {
            promptChooserFunction(prompt);
          }}>
          {promptName}
        </li>
      ))}
    </ul>
  );
};

export default ExpandableList;
