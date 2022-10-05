import { ICategory } from 'types/entities/ICategory';

import cheeseBackground from 'assets/images/categories/cheese-background.png';
import meatBackground from 'assets/images/categories/meat-background.png';

export const backgroundByCategory: Record<string, string> = {
  Meat: meatBackground,
  Cheese: cheeseBackground,

  Мясо: meatBackground,
  Сыр: cheeseBackground,
};

export const getProductCategory = (categories: ICategory[], productSubCategories: ICategory[]) => {
  const productCategory = categories.find(category => {
    const isProductCategory = productSubCategories.find(productSubCategory => productSubCategory.id === category.id);

    return isProductCategory;
  });

  return productCategory;
};

const getCategoryBackground = (category: ICategory) =>
  backgroundByCategory[category.title.ru] || backgroundByCategory[category.title.en];

export const getProductBackground = (categories: ICategory[], productCategories: ICategory[]) => {
  const productCategory = getProductCategory(categories, productCategories);

  const productBackground = productCategory && getCategoryBackground(productCategory);

  return productBackground;
};
