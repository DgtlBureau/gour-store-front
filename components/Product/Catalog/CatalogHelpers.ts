import { IFiltersCharacteristic, IProductCharacteristics } from 'types/entities/IProduct';

export const checkCharacteristics = (characteristics: IProductCharacteristics, filters: IFiltersCharacteristic) =>
  Object.keys(filters.characteristics).every(it => {
    const filterCharacteristic = filters.characteristics[it]!;
    return filterCharacteristic?.length === 0 || filterCharacteristic.includes(characteristics[it]!);
  });

export const checkCategory = (filters: IFiltersCharacteristic, key: string) =>
  filters.category === 'all' || key === filters.category;
