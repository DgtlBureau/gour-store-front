import { IBase } from './IBase';
import { IOrderProduct } from './IOrderProduct';
import { IOrderProfile } from './IOrderProfile';

export interface IOrder extends IBase {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  orderProfile: IOrderProfile;
  comment?: string;
  crmInfo: OrderCrmInfo;
  totalSum: number;
  promotions: OrderPromotion[];
  orderProducts: IOrderProduct[];
}

interface OrderCrmInfo {
  id: string;
  status: {
    name: string;
    color: string;
  };
}

interface OrderPromotion {
  title: string;
  value: number;
  currency: string;
}
