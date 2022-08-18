import { IBaseEntity } from './IBaseEntity';

type WalletTransactionType = 'income' | 'expense';
type WalletTransactionStatus = 'init' | 'approved' | 'rejected';

export interface IWalletTransaction extends Omit<IBaseEntity, 'id'> {
  uuid: string;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  description: string;
}
