import { string } from 'yup/lib/locale';
import { IBaseEntity } from './IBaseEntity';
import { IOrderProduct } from './IOrderProduct';
import { IOrderProfile } from './IOrderProfile';

export interface IOrder {
  order: OrderData;
  crmInfo: OrderCrmInfo;
  promotions: OrderPromotion[];
}
interface OrderData extends IBaseEntity {
  orderProducts: IOrderProduct[];
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  orderProfile: IOrderProfile;
  comment?: string;
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
