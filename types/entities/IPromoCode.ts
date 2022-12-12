import { IBase } from './IBase';
import { ICategory } from './ICategory';

export interface IPromoCode extends IBase {
  key: string;
  discount: number;
  end: string;
  totalCount: number;
  countForOne: number;
  categories: ICategory[];
}
