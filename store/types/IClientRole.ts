import {IBaseEntity} from "./IBaseEntity";

export interface IClientRole extends IBaseEntity {
    title: string;
    key: string;
}