export type CreateInvoiceDto = {
  currency: 'RUB' | 'USD';
  amount: number;
  value: number;
  payerUuid: string;
};
