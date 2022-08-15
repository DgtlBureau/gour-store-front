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
  category: ICategory;
  productGrades: IProductGrade[];
  gradesCount: number;
  commentsCount: number;
  grade: number;
  similarProducts: IProduct[];
  pieces: IProductModification[];
  price: IPrice;
  roleDiscounts: IRoleDiscount[];
  characteristics: ProductCharacteristics;
  meta: IPageMeta;
  weight: number;
  discount: number;
  isWeightGood: boolean;
  promotions?: IPromotion[];
}

export type ProductCharacteristics = { // TODO: add valid union types for other properties
  country?: string;
  meatHardness?: string;
  meatType?: string;

  productType?: string;
  processingType?: string;

  cheeseCategory?: string;
  crustType?: string;
  milk?: string;
  rennet?: string;
  timeOfOrigin?: string;
};

export type ProductCountry = 'Russia' | 'France' | 'Germany';

type CharacteristicsList = {
  [K in keyof Required<ProductCharacteristics>]?: NonNullable<ProductCharacteristics[K]>[];
};

export type FiltersCharacteristic = {
  isReversed: boolean,
  category: string,
  characteristics: CharacteristicsList,
};
