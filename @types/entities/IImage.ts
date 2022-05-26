import { IBaseEntity } from "./IBaseEntity";

export interface IImage extends IBaseEntity {
  small: string;
  full: string;
}