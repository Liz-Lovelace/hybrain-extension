import React from 'react';

import Category from './Category';

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
