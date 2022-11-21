import { IBase } from './IBase';
import { ICity } from './ICity';

export interface IOrderProfile extends IBase {
  title: string;
  city: ICity;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment: string;
}
