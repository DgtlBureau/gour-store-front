import { ICategory } from 'types/entities/ICategory';
import { ProductTypeLabel } from 'types/entities/IProduct';

import cheeseBackground from 'assets/images/categories/cheese-background.png';
import meatBackground from 'assets/images/categories/meat-background.png';

const backgroundByCategory: Record<string, string> = {
  Meat: meatBackground,
  Cheese: cheeseBackground,

  Мясо: meatBackground,
  Сыр: cheeseBackground,
};

// переписать, чтобы юзали функцию ТОЛЬКО 1 раз
const getProductTypeCategory = (categories: ICategory[], productSubCategories: ICategory[]) => {
  const productCategory = categories.find(category => {
    const isProductCategory = productSubCategories?.find(productSubCategory => productSubCategory.id === category.id);

    return isProductCategory;
  });

  return productCategory;
};

export const getProductTypeLabel = (categories: ICategory[], productSubCategories: ICategory[]): ProductTypeLabel => {
  const productType = getProductTypeCategory(categories, productSubCategories);

  return productType?.title.ru as ProductTypeLabel;
};

const getCategoryBackground = (category: ICategory) =>
  backgroundByCategory[category.title.ru] || backgroundByCategory[category.title.en];

export const getProductBackground = (categories: ICategory[], productCategories: ICategory[]) => {
  const productCategory = getProductTypeCategory(categories, productCategories);

  const productBackground = productCategory && getCategoryBackground(productCategory);

  return productBackground;
};
