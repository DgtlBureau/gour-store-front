import { IProduct } from './IProduct';
import { IUser } from './IUser';
import { IBaseEntity } from './IBaseEntity';

export interface IProductGrade extends IBaseEntity {
  product: IProduct;
  client: IUser;
  value: number;
  comment: string;
}
