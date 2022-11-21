import { IBase } from './IBase';
import { ITranslatableString } from './ITranslatableString';

export interface ICategory extends IBase {
  title: ITranslatableString;
  parentCategories?: ICategory[];
  subCategories?: ICategory[];
}

export interface ICategoryWithDiscount {
  id: IBase['id'];
  title: Pick<ITranslatableString, 'ru' | 'en'>;
  subCategories: {
    id: IBase['id'];
    title: Pick<ITranslatableString, 'ru' | 'en'>;
    discountPrice: number;
  }[];
}
