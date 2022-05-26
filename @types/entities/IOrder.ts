import { IOrderProduct } from './IOrderProduct';

export interface IOrder {
  order: {
    id: number;
    firstName: string;
    lastName?: string;
    phone: string;
    email: string;
    deliveryProfileId: number;
    comment?: string;
    createdAt: string,
    orderProducts: IOrderProduct[];
  },
  crmInfo: {
    id: string,
    status: {
      name: string,
      color: string,
    },
  },
}
