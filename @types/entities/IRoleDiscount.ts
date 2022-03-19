import {IProduct} from "./IProduct";
import {IClientRole} from "./IClientRole";
import {IBaseEntity} from "./IBaseEntity";

export interface IRoleDiscount extends IBaseEntity {
    product: IProduct
    role: IClientRole;
    value: number;
}