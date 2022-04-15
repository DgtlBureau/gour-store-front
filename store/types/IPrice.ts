import {IBaseEntity} from "./IBaseEntity";

export interface IPrice extends IBaseEntity {
    rub: number;
    eur: number;
}