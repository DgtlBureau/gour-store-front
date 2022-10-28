import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { GetInvoicePriceDto } from 'types/dto/invoice/getInvoicePrice.dto';
import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { IInvoice, InvoiceStatus } from 'types/entities/IInvoice';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

const mockData: IInvoice[] = [
  {
    id: 1,
    amount: 3100,
    status: InvoiceStatus.WAITING,
    value: 3100,
    createdAt: '2022-04-19T16:04:16Z',
    updatedAt: '2022-04-19T16:04:16Z',
    expiresAt: '2022-04-19T16:34:16Z',
  },
  {
    id: 2,
    amount: 150000,
    status: InvoiceStatus.PAID,
    value: 150000,
    createdAt: '2021-08-02T20:00:16Z',
    updatedAt: '2021-08-02T20:17:16Z',
    expiresAt: '2021-08-02T20:47:16Z',
  },
  {
    id: 3,
    amount: 1,
    status: InvoiceStatus.CANCELLED,
    value: 1,
    createdAt: '2021-08-02T20:00:16Z',
    updatedAt: '2021-08-02T20:17:16Z',
    expiresAt: '2021-08-02T20:47:16Z',
  },
  {
    id: 4,
    amount: 855354,
    status: InvoiceStatus.FAILED,
    value: 855354,
    createdAt: '2022-11-24T13:23:16Z',
    updatedAt: '2022-11-24T13:23:16Z',
    expiresAt: '2022-11-24T13:53:16Z',
  },
];

const PAYMENT_PUBLIC_ID = process.env.NEXT_PAYMENT_PUBLIC_ID as string;

// eslint-disable-next-line no-promise-executor-return
const sleep = (sec: number) => new Promise<void>(res => setTimeout(res, sec * 1000)); // TODO: remove this line

export const invoiceApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getInvoiceList: builder.query<IInvoice[], void>({
        // query: async () => ({
        //   url: 'Path.INVOICES',
        // }),
        async queryFn() {
          await sleep(1);
          return { data: mockData };
        },
        providesTags: result =>
          result
            ? [...result.map(({ id }) => ({ type: 'Invoice', id } as const)), { type: 'Invoice', id: 'LIST' }]
            : [{ type: 'Invoice', id: 'LIST' }],
      }),
      getInvoicePrice: builder.query<number, GetInvoicePriceDto>({
        // query: (body) => ({
        //   url: '',
        // }),
        async queryFn({ count }) {
          await sleep(1);
          return { data: count };
        },
      }),
      buyCheeseCoins: builder.mutation<number, PayInvoiceDto>({
        async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          const { cardNumber, expDateMonth, expDateYear, cvv, price, invoiceEmail } = args;

          const checkout = new cp.Checkout({ publicId: PAYMENT_PUBLIC_ID });
          const signature = await checkout.createPaymentCryptogram({
            cardNumber,
            expDateMonth,
            expDateYear,
            cvv,
          });

          const result = await fetchWithBQ({
            url: 'Path.',
            body: {
              signature,
              price,
              email: invoiceEmail,
              currency: 'RUB',
            },
            method: 'POST',
          });

          return result.data ? { data: result.data as number } : { error: result.error as FetchBaseQueryError };
        },
      }),
    };
  },
});

export const { useGetInvoiceListQuery, useGetInvoicePriceQuery, useBuyCheeseCoinsMutation } = invoiceApi;
