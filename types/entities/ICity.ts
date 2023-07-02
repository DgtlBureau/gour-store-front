import { IBase } from './IBase';
import { ITranslatableString } from './ITranslatableString';

export interface ICity extends IBase {
  id: number;
  name: ITranslatableString;
  deliveryCost: number;
}
