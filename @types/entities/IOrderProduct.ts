import { IProduct } from './IProduct';
import { IProductModification } from './IProductModification';

export interface IOrderProduct {
  product: IProduct;
  amount: number;
  weight: number;
}
