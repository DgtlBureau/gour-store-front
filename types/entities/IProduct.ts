import { ITranslatableString } from './ITranslatableString';
import { ITranslatableText } from './ITranslatableText';
import { IImage } from './IImage';
import { ICategory } from './ICategory';
import { IProductGrade } from './IProductGrade';
import { IProductModification } from './IProductModification';
import { IPrice } from './IPrice';
import { IRoleDiscount } from './IRoleDiscount';
import { IBaseEntity } from './IBaseEntity';
import { IPageMeta } from './IPageMeta';
import { IPromotion } from './IPromotion';

export interface IProduct extends IBaseEntity {
  title: ITranslatableString;
  description: ITranslatableText;
  moyskladCode: number;
  images: IImage[];
  categories: ICategory[];
  productGrades: IProductGrade[];
  gradesCount: number;
  commentsCount: number;
  grade: number;
  similarProducts: IProduct[];
  pieces: IProductModification[];
  price: IPrice;
  roleDiscounts: IRoleDiscount[];
  meta: IPageMeta;
  weight: number;
  discount: number;
  isWeightGood: boolean;
  promotions?: IPromotion[];
}

export interface IFiltersCharacteristic {
  isReversed: boolean;
  productType: number | 'all';
  categories: Record<string, number>;
}
