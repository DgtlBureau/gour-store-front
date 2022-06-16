import { IImage } from "./IImage";

export type CurrentUser = {
  firstName: string,
  lastName: string,
  email: string,
  favoriteIds: string[],
  countries: string[],
  mainOrderProfileId: number,
  cityId: number,
  avatar: IImage,
};