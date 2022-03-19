import {ITranslatableString} from "./ITranslatableString";
import {ITranslatableText} from "./ITranslatableText";
import {IImage} from "./IImage";
import {ICategory} from "./ICategory";
import {IProductGrade} from "./IProductGrade";
import {IProductModification} from "./IProductModification";
import {IPrice} from "./IPrice";
import {IRoleDiscount} from "./IRoleDiscount";
import {IBaseEntity} from "./IBaseEntity";
import {IPageMeta} from "./IPageMeta";

export interface IProduct extends IBaseEntity {
    title: ITranslatableString;
    description: ITranslatableText;
    moyskladCode: number;
    images: IImage[];
    category: ICategory;
    productGrades: IProductGrade[];
    grade: number;
    similarProducts: IProduct[];
    pieces: IProductModification[];
    price: IPrice;
    roleDiscounts: IRoleDiscount[];
    characteristics: Record<string, string|number>
    meta: IPageMeta;
    weight: number;
}