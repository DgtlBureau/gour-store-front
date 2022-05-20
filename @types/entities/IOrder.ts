import { IOrderProduct } from './IOrderProduct';

export interface IOrder {
  orderProducts: IOrderProduct[];
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  deliveryProfileId: number;
  comment?: string;
}
