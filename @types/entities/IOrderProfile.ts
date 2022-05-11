import { IBaseEntity } from './IBaseEntity';

export interface IOrderProfile extends IBaseEntity {
  title: string;
  cityId: 0;
  street: '';
  house: '';
  apartment: '';
  entrance: '';
  floor: '';
}