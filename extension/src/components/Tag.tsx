import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  title: string;
  color: string;
}

const Tag: React.FC<TagProps> = ({ title, color }) => {
  return (
    <span className={styles.tag} style={{ backgroundColor: color }}>
      {title}
    </span>
  );
};

export default Tag;
