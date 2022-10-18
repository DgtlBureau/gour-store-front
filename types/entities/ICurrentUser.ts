import { IBase } from './IBase';
import { ICity } from './ICity';
import { IImage } from './IImage';
import { IReferralCode } from './IReferralCode';

export interface ICurrentUser extends IBase {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  lives: number;
  favoriteIds: string[];
  countries: string[];
  mainOrderProfileId: number;
  city: ICity;
  avatar: IImage;
  referralCode: IReferralCode;
}
