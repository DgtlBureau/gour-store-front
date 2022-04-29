import { IOrderProduct } from './IOrderProduct';

export interface IOrder {
  orderProducts: IOrderProduct[];
  comment?: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  cityId: number;
  deliveryType: string;
  address: string;
}
