import {IProduct} from "./IProduct";
import {IProductModification} from "./IProductModification";

export interface IOrderProduct {
    product: IProduct;
    weight: number;
    amount: number;
}