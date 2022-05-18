import { OrderProductDto } from './product.dto';

export type CreateOrderDto = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryProfileId: number;
  orderProducts: OrderProductDto[];
  comment?: string;
};
