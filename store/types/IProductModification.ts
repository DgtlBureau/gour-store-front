import {TranslatableString} from "../../entity/TranslatableString";
import {Product} from "../../entity/Product";
import {Warehouse} from "../../entity/Warehouse";
import {ITranslatableString} from "./ITranslatableString";
import {IProduct} from "./IProduct";
import {IBaseEntity} from "./IBaseEntity";

export interface IProductModification extends IBaseEntity {
    title: ITranslatableString;
    weight: number;
    quantityInStock: number;
    moyskladCode: number;
    product: IProduct;
    warehouse: Warehouse;
}