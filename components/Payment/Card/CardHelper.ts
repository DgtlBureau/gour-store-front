import { InvoiceStatus } from 'types/entities/IInvoice';

type InvoiceStatusLabels = {
  name: string;
  className: 'statusWaiting' | 'statusCancelled' | 'statusPaid' | 'statusFailed';
};

export const paymentColorByStatus: Record<InvoiceStatus, InvoiceStatusLabels> = {
  PAID: {
    name: 'Оплачен',
    className: 'statusPaid',
  },
  WAITING: {
    name: 'Ожидание оплаты',
    className: 'statusWaiting',
  },
  FAILED: {
    name: 'Ошибка оплаты',
    className: 'statusFailed',
  },
  CANCELLED: {
    name: 'Платеж отменен',
    className: 'statusCancelled',
  },
};

export type PayBtnKeys = Exclude<InvoiceStatus, 'PAID' | 'CANCELLED'>;
export const payButtonFields: Record<PayBtnKeys, string> = {
  WAITING: 'оплатить',
  FAILED: 'повторить оплату',
};
