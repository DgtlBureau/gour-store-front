import {IProduct} from "./IProduct";
import {IProductModification} from "./IProductModification";

export interface IOrderProduct {
    product: IProduct;
    productPiece: IProductModification;
    amount: number;
    cost: number;
}