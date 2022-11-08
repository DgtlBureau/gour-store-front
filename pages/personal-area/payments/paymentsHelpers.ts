import { FullInvoice } from '.';
import { format } from 'date-fns';

import { IInvoice } from 'types/entities/IInvoice';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';

type PaymentsByDate = Record<string, FullInvoice[]>;
function sortPaymentDate(a: IInvoice | IWalletTransaction, b: IInvoice | IWalletTransaction) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export const formatInvoicesByDate = (payments: IInvoice[]) => {
  const sortedPayments = [...payments].sort(sortPaymentDate);

  return sortedPayments.reduce<PaymentsByDate>((acc, invoice) => {
    const dateKey = format(new Date(invoice.updatedAt), 'yyyy.MM.dd');

    acc[dateKey] ||= [];

    acc[dateKey].push({
      uuid: invoice.uuid,
      status: invoice.status,
      coins: invoice.amount,
      value: invoice.value,
      updatedAt: new Date(invoice.updatedAt),
      expiresAt: new Date(invoice.expiresAt),
      description: null,
    });

    return acc;
  }, {});
};

export const formatTransactionsByDate = (payments: IWalletTransaction[]) => {
  const sortedPayments = [...payments].sort(sortPaymentDate);

  return sortedPayments.reduce<PaymentsByDate>((acc, invoice) => {
    const dateKey = format(new Date(invoice.updatedAt), 'yyyy.MM.dd');

    acc[dateKey] ||= [];

    acc[dateKey].push({
      uuid: invoice.uuid,
      status: invoice.type,
      coins: invoice.newValue - invoice.prevValue,
      value: invoice.newValue - invoice.prevValue,
      updatedAt: new Date(invoice.updatedAt),
      expiresAt: null,
      description: invoice.description,
    });

    return acc;
  }, {});
};

export const sortPaymentsByDate = (payments: PaymentsByDate) =>
  Object.entries(payments).sort(([a], [b]) => b.localeCompare(a));
