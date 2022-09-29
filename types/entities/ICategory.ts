import { IBaseEntity } from './IBaseEntity';
import { ITranslatableString } from './ITranslatableString';

export interface ICategory extends IBaseEntity {
  title: ITranslatableString;
  parentCategories: ICategory[];
  subCategories: ICategory[];
}

export interface ICategoryNew {
  id: number;
  title: ITranslatableString;
  parentCategories: ICategoryNew[];
  subCategories: ICategoryNew[];
}
