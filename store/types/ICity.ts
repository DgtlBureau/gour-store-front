import {ITranslatableString} from "./ITranslatableString";
import {IBaseEntity} from "./IBaseEntity";

export interface ICity extends IBaseEntity {
    name: ITranslatableString;
}