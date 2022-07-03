import { IBaseEntity } from "./IBaseEntity";
import { ITranslatableString } from "./ITranslatableString";
import { ITranslatableText } from "./ITranslatableText";

export interface ICategory extends IBaseEntity {
  key: string;
  title: ITranslatableString;
  description: ITranslatableText;
}
