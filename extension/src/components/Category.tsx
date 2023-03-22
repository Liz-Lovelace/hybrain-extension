import React, { useState } from 'react';

import styles from './Category.module.css';
import PromptList from './PromptList';

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.categoryItem}>
      <div className={styles.title} onClick={toggleExpand}>
        {category.name}
        <span className={styles.icon}>{isExpanded ? 'V' : '>'}</span>
      </div>
      {isExpanded && <PromptList items={category.prompts} />}
    </div>
  );
};

export default CategoryItem;
