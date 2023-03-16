import React, { useState } from 'react';

import { CategoryData } from '../App';
import styles from './CategoryItem.module.css';
import ExpandableList from './ExpandableList';

interface CategoryItemProps {
  category: CategoryData;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, promptChooserFunction }) => {
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
      {isExpanded && <ExpandableList items={category.prompts} promptChooserFunction={promptChooserFunction} />}
    </div>
  );
};

export default CategoryItem;
