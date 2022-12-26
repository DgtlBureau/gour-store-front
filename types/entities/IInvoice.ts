import { IBase } from './IBase';

export enum InvoiceStatus {
  WAITING = 'WAITING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface IInvoice extends Omit<IBase, 'id'> {
  uuid: string;
  amount: number; // count of cheesecoins
  value: number; // total price
  status: InvoiceStatus;
  expiresAt: string;
}

export interface I3DSecureDto {
  MD: string;
  PaReq: string;
  TermUrl: string;
  acsUrl: string;
}
