import { ITranslatableString } from "./ITranslatableString";
import { IPageMeta } from "./IPageMeta";

export interface IPage {
  id: number;
  key: string,
  info: {
    title: ITranslatableString;
    description: ITranslatableString;
  },
  meta: IPageMeta;
}
