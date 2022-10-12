import { ICategory } from 'types/entities/ICategory';
import { IOption } from 'types/entities/IOption';
import { Language } from 'types/entities/Language';

import { OrderTypeOption } from 'constants/filters';

export const convertSubCategoriesToOptions = (subCategories: ICategory[], language: Language): IOption[] =>
  subCategories.map(category => ({ value: category.id.toString(), label: category.title[language] }));

export const convertOrderTypesToOptions = (orderTypes: OrderTypeOption[], language: Language): IOption[] =>
  orderTypes.map(it => ({ value: it.type, label: it.title[language] }));
