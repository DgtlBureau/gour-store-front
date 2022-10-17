import { ICategory } from 'types/entities/ICategory';
import { IOption } from 'types/entities/IOption';
import { IExtendedProduct, IProduct, ProductTypeLabel } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import { OrderTypeOption } from 'constants/filters';
import { isProductFavorite } from 'pages/favorites/favoritesHelper';

import { getProductBackground, getProductTypeLabel } from './categoryUtil';
import { getCountryImage } from './countryUtil';

export const convertSubCategoriesToOptions = (subCategories: ICategory[], language: Language): IOption[] =>
  subCategories.map(category => ({ value: category.id.toString(), label: category.title[language] }));

export const convertOrderTypesToOptions = (orderTypes: OrderTypeOption[], language: Language): IOption[] =>
  orderTypes.map(it => ({ value: it.type, label: it.title[language] }));

export const computeProductsWithCategories = (
  products: IProduct[],
  categories: ICategory[],
  favoriteProducts: IProduct[],
): IExtendedProduct[] =>
  products.map(product => ({
    ...product,
    isElected: isProductFavorite(product.id, favoriteProducts),
    productType: getProductTypeLabel(categories || [], product.categories || []), // TODO: лишний раз считаю тип продукта, не кидаться стульями(
    backgroundImg: getProductBackground(categories, product.categories || []),
    countryImg: getCountryImage(product.categories),
  }));

export const getDefaultGramByProductType = (label: ProductTypeLabel): number => {
  const gramObj = {
    Мясо: 100,
    Сыр: 150,
  };

  return gramObj[label];
};
