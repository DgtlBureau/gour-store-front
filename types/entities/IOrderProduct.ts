import { IBase } from './IBase';
import { IProduct } from './IProduct';

export interface IOrderProduct extends IBase {
  product: IProduct;
  amount: number;
  gram: number;
  totalSum: number;
  totalSumWithoutAmount: number;
}
