import { IBaseEntity } from './IBaseEntity';

export interface IOrderProfile extends IBaseEntity {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryType: string;
  address: string;
  city: string;
}
