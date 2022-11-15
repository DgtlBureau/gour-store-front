import { IBase } from './IBase';
import { IOrderProduct } from './IOrderProduct';
import { IOrderProfile } from './IOrderProfile';

export interface IOrder extends IBase {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  comment?: string;
  totalSum: number;
  crmInfo: OrderCrmInfo;
  orderProfile: IOrderProfile;
  promotions: OrderPromotion[];
  orderProducts: IOrderProduct[];
}

export interface OrderCrmInfo {
  id: number;
  status: OrderCrmInfoStatus;
}
export interface OrderCrmInfoStatus {
  name: string;
  color: string;
}

interface OrderPromotion {
  title: string;
  value: number;
  currency: string;
}
