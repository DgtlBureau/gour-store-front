import {IProduct} from "./IProduct";
import {IClient} from "./IClient";
import {IBaseEntity} from "./IBaseEntity";

export interface IProductGrade extends IBaseEntity {
    product: IProduct;
    client: IClient;
    value: number;
    comment: string;
}