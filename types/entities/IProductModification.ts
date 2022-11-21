import { IBase } from './IBase';
import { IProduct } from './IProduct';
import { ITranslatableString } from './ITranslatableString';
import { IWarehouse } from './IWarehouse';

export interface IProductModification extends IBase {
  title: ITranslatableString;
  weight: number;
  quantityInStock: number;
  moyskladCode: number;
  product: IProduct;
  warehouse: IWarehouse;
}
