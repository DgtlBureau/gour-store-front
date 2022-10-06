import { IBase } from './IBase';
import { ICity } from './ICity';

export interface IWarehouse extends IBase {
  title: string;
  city: ICity;
}
