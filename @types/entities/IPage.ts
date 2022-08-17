import { IBaseEntity } from './IBaseEntity';
import { ITranslatableString } from './ITranslatableString';
import { IPageMeta } from './IPageMeta';

export interface IPage extends IBaseEntity {
  key: string,
  info: {
    title: ITranslatableString;
    description: ITranslatableString;
  },
  meta: IPageMeta;
}
