export type PayInvoiceDto = Readonly<{
  cardNumber: string;
  expDateMonth: string;
  expDateYear: string;
  cvv: string;

  invoiceUuid: string;
  payerUuid: string;
  email?: string;
  price: number;
}>;

export type PayServerInvoiceDto = Readonly<{
  currency: 'RUB' | 'USD';
  payerUuid: string;
  email?: string;
  ipAddress: string;
  signature: string;
  invoiceUuid: string;
}>;
