import { ICategory } from 'types/entities/ICategory';
import { IFiltersCharacteristic } from 'types/entities/IProduct';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkCharacteristics = (productCategories: ICategory[], filters: Record<string, number>) =>
  // TODO: реализация фильтров
  true;

export const checkCategory = (categories: ICategory[], categoryKey: IFiltersCharacteristic['productType']) =>
  categoryKey === 'all' || categories.find(category => category.id === categoryKey);
