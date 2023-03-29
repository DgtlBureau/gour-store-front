import { OrderProductDto } from './product.dto';

export type CreateOrderDto = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryProfileId: number;
  promoCodeId?: number;
  orderProducts: OrderProductDto[];
  comment?: string;
  paymentMethod?: string;
};
