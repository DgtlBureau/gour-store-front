import { IProduct } from './IProduct';
import { IUser } from './IUser';
import { IBase } from './IBase';

export interface IProductGrade extends IBase {
  product: IProduct;
  client: IUser;
  value: number;
  comment: string;
}
