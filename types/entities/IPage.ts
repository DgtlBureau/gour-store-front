import { IBase } from './IBase';
import { ITranslatableString } from './ITranslatableString';
import { IPageMeta } from './IPageMeta';

export interface IPage extends IBase {
  key: string;
  info: {
    title: ITranslatableString;
    description: ITranslatableString;
  };
  meta: IPageMeta;
}
