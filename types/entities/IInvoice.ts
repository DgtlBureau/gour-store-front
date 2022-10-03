import { IBase } from './IBase';

export enum InvoiceStatus {
  WAITING = 'WAITING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface IInvoice extends IBase {
  amount: number; // count of cheesecoints
  value: number; // total price
  status: InvoiceStatus;
  expiresAt: string;
}
