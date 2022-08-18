import { IBaseEntity } from './IBaseEntity';
import { IWalletTransaction } from './IWalletTransaction';

export interface IWallet extends Omit<IBaseEntity, 'id'> {
  uuid: string;
  value: string;
  changes: IWalletTransaction[];
}
