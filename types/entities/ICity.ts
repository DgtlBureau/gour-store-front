import { IBase } from './IBase';
import { ITranslatableString } from './ITranslatableString';

export interface ICity extends IBase {
  name: ITranslatableString;
  deliveryCost: number;
}
