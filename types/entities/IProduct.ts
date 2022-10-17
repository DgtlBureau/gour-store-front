import { IBase } from './IBase';
import { ICategory } from './ICategory';
import { IImage } from './IImage';
import { IPageMeta } from './IPageMeta';
import { IPrice } from './IPrice';
import { IProductGrade } from './IProductGrade';
import { IProductModification } from './IProductModification';
import { IPromotion } from './IPromotion';
import { IRoleDiscount } from './IRoleDiscount';
import { ITranslatableString } from './ITranslatableString';
import { ITranslatableText } from './ITranslatableText';

export interface IProduct extends IBase {
  title: ITranslatableString;
  description: ITranslatableText;
  moyskladCode: number;
  moyskladId: string | null;
  images: IImage[];
  categories?: ICategory[];
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

export type OrderType = 'price' | 'price-reverse' | 'discount' | 'rate' | 'default';

export interface IFilters {
  productType: number | null;
  orderType: OrderType;
  characteristics: Record<string, string[]>;
}

export type ProductTypeLabel = 'Сыр' | 'Мясо';

export interface IExtendedProduct extends IProduct {
  isElected: boolean;
  backgroundImg?: string;
  countryImg?: string;
  // currentCount: number;
  productType: ProductTypeLabel;
}
