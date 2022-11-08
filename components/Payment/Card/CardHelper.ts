import { InvoiceStatus } from 'types/entities/IInvoice';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';

type InvoiceStatusLabels = {
  name: string;
  className: 'statusWaiting' | 'statusCancelled' | 'statusPaid' | 'statusFailed';
};

export const paymentColorByStatus: Record<InvoiceStatus | IWalletTransaction['type'], InvoiceStatusLabels> = {
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

  income: {
    name: 'Пополнение',
    className: 'statusPaid',
  },
  expense: {
    name: 'Списание',
    className: 'statusFailed',
  },
};

export type PayBtnKeys = Exclude<InvoiceStatus, 'PAID' | 'CANCELLED'>;
export const payButtonFields: Record<PayBtnKeys, string> = {
  WAITING: 'оплатить',
  FAILED: 'повторить оплату',
};
