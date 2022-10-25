export type PayInvoiceDto = Readonly<{
  cardNumber: string;
  expDateMonth: number;
  expDateYear: number;
  cvv: number;

  invoiceEmail?: string;
  price: number;
}>;
