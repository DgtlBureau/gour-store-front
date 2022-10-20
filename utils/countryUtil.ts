import { imageByCountry } from 'constants/countries';

import { ICategory } from 'types/entities/ICategory';

export const getCountryImage = (categories?: ICategory[]) =>
  categories?.reduce<string | undefined>(
    (countryImg, category) => countryImg || imageByCountry[category.title.ru] || imageByCountry[category.title.en],
    undefined,
  );
