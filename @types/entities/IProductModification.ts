import {IWarehouse} from "./IWarehouse";
import {ITranslatableString} from "./ITranslatableString";
import {IProduct} from "./IProduct";
import {IBaseEntity} from "./IBaseEntity";

export interface IProductModification extends IBaseEntity {
    title: ITranslatableString;
    weight: number;
    quantityInStock: number;
    moyskladCode: number;
    product: IProduct;
    warehouse: IWarehouse;
}