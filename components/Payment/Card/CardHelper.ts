import { InvoiceStatus } from 'types/entities/IInvoice';

type InvoiceStatusLabels = {
  name: string;
  color: string;
};

export const paymentColorByStatus: Record<InvoiceStatus, InvoiceStatusLabels> = {
  PAID: {
    name: 'Оплачен',
    color: '#DEF4E6',
  },
  WAITING: {
    name: 'Ожидание оплаты',
    color: '#FFF1BE',
  },
  FAILED: {
    name: 'Ошибка оплаты',
    color: '#F7A400',
  },
  CANCELLED: {
    name: 'Платеж отменен',
    color: '#FFE5D6',
  },
};

export type PayBtnKeys = Exclude<InvoiceStatus, 'PAID' | 'CANCELLED'>;
type PayBtnOptions = { name: string; className: 'payBtn' | 'repayBtn' };
const payButtonFields: Record<PayBtnKeys, PayBtnOptions> = {
  WAITING: {
    name: 'оплатить',
    className: 'payBtn',
  },
  FAILED: {
    name: 'повторить оплату',
    className: 'repayBtn',
  },
};
export const getPayBtnFields = (key: PayBtnKeys) => payButtonFields[key];
