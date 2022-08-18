import { IBaseEntity } from './IBaseEntity';
import { ITranslatableString } from './ITranslatableString';

export interface ICity extends IBaseEntity {
  name: ITranslatableString;
}
