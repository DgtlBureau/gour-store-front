import { IWarehouse } from './IWarehouse';
import { ITranslatableString } from './ITranslatableString';
import { IProduct } from './IProduct';
import { IBase } from './IBase';

export interface IProductModification extends IBase {
  title: ITranslatableString;
  weight: number;
  quantityInStock: number;
  moyskladCode: number;
  product: IProduct;
  warehouse: IWarehouse;
}
