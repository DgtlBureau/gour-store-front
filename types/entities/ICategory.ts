import { IBase } from './IBase';
import { ITranslatableString } from './ITranslatableString';

export interface ICategory extends IBase {
  title: ITranslatableString;
  parentCategories: ICategory[];
  subCategories: ICategory[];
}
