import { IBaseEntity } from './IBaseEntity';
import { ICity } from './ICity';
import { IImage } from './IImage';

export interface IUser extends IBaseEntity {
  roleId: number;
  isApproved: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  cityId: number;
  referralCodeId: number;
  avatarId: 1;
  city: ICity;
  referralCode: {
    code: string;
    discount: number;
  };
  avatar: IImage;
}
