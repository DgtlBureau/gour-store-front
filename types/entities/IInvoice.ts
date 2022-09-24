import { IBaseEntity } from './IBaseEntity';

export enum InvoiceStatus {
  WAITING = 'WAITING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface IInvoice extends IBaseEntity {
  amount: number; // count of cheesecoints
  value: number; // total price
  status: InvoiceStatus;
  expiresAt: string;
}
