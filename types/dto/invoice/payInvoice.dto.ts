export type PayInvoiceDto = Readonly<{
  cardNumber: string;
  expDateMonth: string;
  expDateYear: string;
  cvv: string;

  invoiceEmail?: string;
  price: number;
}>;
