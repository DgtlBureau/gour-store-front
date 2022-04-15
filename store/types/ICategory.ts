import {ITranslatableString} from "./ITranslatableString";
import {ITranslatableText} from "./ITranslatableText";
import {IBaseEntity} from "./IBaseEntity";

export interface ICategory extends IBaseEntity {
    title: ITranslatableString;
    description: ITranslatableText;
    icon: string;
}