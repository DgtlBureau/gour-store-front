import { IBase } from './IBase';

type WalletTransactionType = 'income' | 'expense';
type WalletTransactionStatus = 'init' | 'approved' | 'rejected';

export interface IWalletTransaction extends Omit<IBase, 'id'> {
  uuid: string;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  description: string;
}
