import { ITranslatableString } from './ITranslatableString';
import { ITranslatableText } from './ITranslatableText';
import { IImage } from './IImage';
import { IProduct } from './IProduct';
import { IBase } from './IBase';

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
