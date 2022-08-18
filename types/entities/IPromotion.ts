import { ITranslatableString } from './ITranslatableString';
import { ITranslatableText } from './ITranslatableText';
import { IImage } from './IImage';
import { IProduct } from './IProduct';
import { IBaseEntity } from './IBaseEntity';

export interface IPromotion extends IBaseEntity {
  title: ITranslatableString;
  description: ITranslatableText;
  cardImage: IImage;
  pageImage: IImage;
  discount: number;
  start: Date;
  end: Date;
  products?: IProduct[];
}
