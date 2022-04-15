import {ClientRole} from "../../entity/ClientRole";
import {Product} from "../../entity/Product";
import {IBaseEntity} from "./IBaseEntity";

export interface IClient extends IBaseEntity {
    apiUserUuid: string;
    role: ClientRole;
    additionalInfo: Record<string, string|number>;
    favorites: Product[]
}