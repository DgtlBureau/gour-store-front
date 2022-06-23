import { IProduct } from "./IProduct";
import { IProductModification } from "./IProductModification";

export interface IOrderProduct extends IProductModification {
  product: IProduct;
  amount: number;
  weight: number;
}
