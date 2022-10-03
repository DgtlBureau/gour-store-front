import { IProduct } from './IProduct';
import { IClientRole } from './IClientRole';
import { IBase } from './IBase';

export interface IRoleDiscount extends IBase {
  product: IProduct;
  role: IClientRole;
  value: number;
}
