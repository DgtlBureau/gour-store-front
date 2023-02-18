export type PayInvoiceDto = Readonly<{
  cardNumber: string;
  expDateMonth: string;
  expDateYear: string;
  cvv: string;

  invoiceUuid: string;
  payerUuid: string;
  email?: string;
  price: number;
  fullName: string;
  code: string;
}>;

export type PayServerInvoiceDto = Readonly<{
  currency: 'RUB' | 'USD';
  payerUuid: string;
  email?: string;
  ipAddress: string;
  signature: string;
  invoiceUuid: string;
  fullName: string;
  code: string;
}>;
