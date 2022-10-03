import { IBase } from './IBase';
import { IImage } from './IImage';
import { IReferralCode } from './IReferralCode';
import { IClientRole } from './IClientRole';
import { ICity } from './ICity';

export interface IUser extends IBase {
  role: IClientRole;
  isApproved: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: ICity;
  referralCode: IReferralCode;
  avatar: IImage;
}
