import {IClientRole} from "./IClientRole";
import {IProduct} from "./IProduct";
import {IBaseEntity} from "./IBaseEntity";

export interface IClient extends IBaseEntity {
    apiUserUuid: string;
    role: IClientRole;
    additionalInfo: Record<string, string|number>;
    favorites: IProduct[]
}