import { IProduct } from './IProduct';

export interface IOrderProduct {
  product: IProduct;
  amount: number;
  gram: number;
}
