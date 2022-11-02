import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { CreateInvoiceDto } from 'types/dto/invoice/createInvoice.dto';
import { GetInvoicePriceDto } from 'types/dto/invoice/getInvoicePrice.dto';
import { PayInvoiceDto, PayServerInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { IInvoice } from 'types/entities/IInvoice';

import { commonApi } from './commonApi';

const PAYMENT_PUBLIC_ID = process.env.NEXT_PUBLIC_PAYMENT_PUBLIC_ID as string;

export const invoiceApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getInvoiceList: builder.query<IInvoice[], { userId: string }>({
        query: params => ({
          url: '/payment/invoice',
          params,
        }),
        providesTags: result =>
          result
            ? [...result.map(({ uuid: id }) => ({ type: 'Invoice', id } as const)), { type: 'Invoice', id: 'LIST' }]
            : [{ type: 'Invoice', id: 'LIST' }],
      }),
      getInvoicePrice: builder.query<number, GetInvoicePriceDto>({
        query: body => ({
          method: 'POST',
          url: '/wallet/get-amount-by-currency',
          body,
        }),
      }),
      createInvoice: builder.mutation<IInvoice, CreateInvoiceDto>({
        query: body => ({
          url: '/payment/invoice',
          method: 'POST',
          body,
        }),
      }),
      buyCheeseCoins: builder.mutation<number, PayInvoiceDto>({
        async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          const { cardNumber, expDateMonth, expDateYear, cvv, email, invoiceUuid, payerUuid } = args;
          const checkoutValues = {
            cvv,
            cardNumber,
            expDateMonth,
            expDateYear,
          };

          try {
            const checkout = new cp.Checkout({ publicId: PAYMENT_PUBLIC_ID });
            const signature = await checkout.createPaymentCryptogram(checkoutValues);

            const ipAddress = '5.18.144.32';

            const requestBody: PayServerInvoiceDto = {
              signature,
              email,
              ipAddress,
              payerUuid,
              currency: 'RUB',
              invoiceUuid,
            };

            const result = await fetchWithBQ({
              url: '/wallet/wallet-replenish-balance', // TODO: вынести в константы пути
              body: requestBody,
              method: 'POST',
            });

            if (result.data) {
              const redirectUri = (result.data as { redirect: string }).redirect;
              if (redirectUri) window.open(redirectUri, '_self');
            }

            return result.data ? { data: result.data as number } : { error: result.error as FetchBaseQueryError };
          } catch (e) {
            console.error('[PAYMENT VALIDATION]:', e); // TODO: дописать обработку ошибок
            return { error: { status: 400, data: 'Ошибка валидации' } };
          }
        },
      }),
    };
  },
});

export const { useGetInvoiceListQuery, useGetInvoicePriceQuery, useCreateInvoiceMutation, useBuyCheeseCoinsMutation } =
  invoiceApi;
