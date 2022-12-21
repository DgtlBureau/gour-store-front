import { IBase } from './IBase';
import { IProduct } from './IProduct';
import { IUser } from './IUser';

export interface IProductGrade extends IBase {
  product: IProduct;
  client: IUser;
  isApproved: boolean | null;
  value: number;
  comment: string;
}
