import { IBase } from './IBase';

type WalletTransactionType = 'income' | 'expense';
export enum WalletTransactionStatus {
  INIT = 'init',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface IWalletTransaction extends Omit<IBase, 'id'> {
  uuid: string;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  description: string;
  prevValue: number;
  newValue: number;
}
