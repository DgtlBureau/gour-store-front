import { IBase } from './IBase';

export interface IReferralCode extends IBase {
  code: string;
  discount: number;
  fullName: string;
  phone: string;
}
