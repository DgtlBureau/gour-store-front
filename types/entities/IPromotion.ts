import { IBase } from './IBase';
import { IImage } from './IImage';
import { IProduct } from './IProduct';
import { ITranslatableString } from './ITranslatableString';
import { ITranslatableText } from './ITranslatableText';

export interface IPromotion extends IBase {
  title: ITranslatableString;
  description: ITranslatableText;
  cardImage: IImage;
  pageImage: IImage;
  discount: number;
  start: Date;
  end: Date;
  products?: IProduct[];
}
