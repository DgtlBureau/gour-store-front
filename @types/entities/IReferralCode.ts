import { IBaseEntity } from './IBaseEntity';

export interface IReferralCode extends IBaseEntity {
  code: string;
  discount: number;
}
