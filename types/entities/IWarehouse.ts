import { ICity } from './ICity';
import { IBase } from './IBase';

export interface IWarehouse extends IBase {
  title: string;
  city: ICity;
}
