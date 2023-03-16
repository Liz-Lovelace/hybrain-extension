import React from 'react';

import CategoryItem from './CategoryItem';

const CategoryList: React.FC<CategoryListProps> = ({ categories, promptChooserFunction }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} promptChooserFunction={promptChooserFunction} />
      ))}
    </div>
  );
};

export default CategoryList;
