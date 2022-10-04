import { IBase } from './IBase';
import { IWalletTransaction } from './IWalletTransaction';

export interface IWallet extends Omit<IBase, 'id'> {
  value: string;
  changes: IWalletTransaction[];
}
