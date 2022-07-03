import { IBaseEntity } from './IBaseEntity';
import { IImage } from './IImage';
import { IReferralCode } from './IReferralCode';

export interface ICurrentUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  favoriteIds: string[];
  countries: string[];
  mainOrderProfileId: number;
  cityId: number;
  avatar: IImage;
  referralCode: IReferralCode;
}
