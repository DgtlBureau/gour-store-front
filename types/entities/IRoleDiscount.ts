import { IBase } from './IBase';
import { IClientRole } from './IClientRole';
import { IProduct } from './IProduct';

export interface IRoleDiscount extends IBase {
  product: IProduct;
  role: IClientRole;
  value: number;
}
