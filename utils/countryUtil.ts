import { ICategory } from 'types/entities/ICategory';

import { imageByCountry } from 'constants/countries';

export const getCountryImage = (categories?: ICategory[]) =>
  categories?.reduce<string | undefined>(
    (countryImg, category) => countryImg || imageByCountry[category.title.ru] || imageByCountry[category.title.en],
    undefined,
  );
