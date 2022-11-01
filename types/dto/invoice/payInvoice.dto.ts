export type PayInvoiceDto = Readonly<{
  cardNumber: string;
  expDateMonth: string;
  expDateYear: string;
  cvv: string;

  invoiceUuid: string;
  payerUuid: string;
  email?: string;
  price: number; // FIXME: удолить
}>;

export type PayServerInvoiceDto = Readonly<{
  currency: 'RUB' | 'USD'; // FIXME: вынести в тип
  payerUuid: string;
  email?: string;
  ipAddress: string;
  signature: string;
  invoiceUuid: string;
}>;
