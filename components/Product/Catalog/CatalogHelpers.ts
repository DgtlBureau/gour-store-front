import { ICategory } from 'types/entities/ICategory';
import { IFiltersCharacteristic, IProduct } from 'types/entities/IProduct';

import { getProductBackground, getProductTypeLabel } from 'utils/categoryUtil';
import { getCountryImage } from 'utils/countryUtil';

import { isProductFavorite } from 'pages/favorites/favoritesHelper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkCharacteristics = (productCategories: ICategory[], filters: Record<string, number>) =>
  // TODO: реализация фильтров
  true;

export const checkCategory = (categories: ICategory[], categoryKey: IFiltersCharacteristic['productType']) =>
  categoryKey === 'all' || categories.find(category => category.id === categoryKey);

export const computeProductsWithCategories = (
  products: IProduct[],
  categories: ICategory[],
  favoriteProducts: IProduct[],
) =>
  products.map(product => ({
    ...product,
    isElected: isProductFavorite(product.id, favoriteProducts),
    productType: getProductTypeLabel(categories || [], product.categories || []), // TODO: лишний раз считаю тип продукта, не кидаться стульями(
    backgroundImg: getProductBackground(categories, product.categories || []),
    countryImg: getCountryImage(product.categories),
  }));
