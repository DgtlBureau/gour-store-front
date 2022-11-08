export type CreateInvoiceDto = {
  currency: 'RUB' | 'USD'; // FIXME: вынести в тип
  amount: number;
  value: number;
  payerUuid: string;
};
