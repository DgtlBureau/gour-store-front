export type CreateOrderDto = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryProfile: number;
  cityId: number;
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
  comment?: string;
};
