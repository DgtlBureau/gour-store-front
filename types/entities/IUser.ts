import { IBase } from './IBase';
import { ICity } from './ICity';
import { IClientRole } from './IClientRole';
import { IImage } from './IImage';
import { IReferralCode } from './IReferralCode';

export interface IUser extends Omit<IBase, 'id'> {
  id: string;
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
