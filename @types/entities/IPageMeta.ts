import {ITranslatableString} from './ITranslatableString';

export interface IPageMeta {
    metaTitle: ITranslatableString;
    metaDescription: ITranslatableString;
    metaKeywords: ITranslatableString;
    isIndexed: boolean;
}