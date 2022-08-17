import { ICity } from './ICity';
import { IBaseEntity } from './IBaseEntity';

export interface IWarehouse extends IBaseEntity {
  title: string;
  city: ICity;
}
