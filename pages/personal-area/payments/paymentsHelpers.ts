import { IInvoice } from 'types/entities/IInvoice';

import { format } from 'date-fns';

import { FullInvoice } from '.';

export const formatPaymentsByDate = (payments: IInvoice[]) =>
  payments.reduce<Record<string, FullInvoice[]>>((acc, invoice) => {
    const dateKey = format(new Date(invoice.updatedAt), 'yyyy.MM.dd');
    acc[dateKey] = acc[dateKey] || [];

    acc[dateKey].push({
      uuid: invoice.uuid,
      status: invoice.status,
      cheeseCoinCount: invoice.amount,
      updatedAt: new Date(invoice.updatedAt),
      expiresAt: new Date(invoice.expiresAt),
    });

    return acc;
  }, {});

type PaymentsByDate = Record<string, FullInvoice[]>;
export const sortPaymentsByDate = (payments: PaymentsByDate) =>
  Object.entries(payments).sort(([a], [b]) => b.localeCompare(a));
