import { IBase } from './IBase';
import { ICity } from './ICity';
import { IClientRole } from './IClientRole';
import { IImage } from './IImage';
import { IReferralCode } from './IReferralCode';

export interface ICurrentUser extends Omit<IBase, 'id'> {
  id: string;
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
  role: IClientRole;
}
