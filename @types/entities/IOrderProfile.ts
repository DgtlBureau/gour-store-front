import { IBaseEntity } from './IBaseEntity';
import { ICity } from './ICity';

export interface IOrderProfile extends IBaseEntity {
  title: string;
  city: ICity;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
}
