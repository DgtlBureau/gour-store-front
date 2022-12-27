import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { CreateInvoiceDto } from 'types/dto/invoice/createInvoice.dto';
import { GetInvoicePriceDto } from 'types/dto/invoice/getInvoicePrice.dto';
import { PayInvoiceDto, PayServerInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { IInvoice } from 'types/entities/IInvoice';

import { CardValidationError } from 'errors/CardValidationError';

import { commonApi, providesList } from './commonApi';

const PAYMENT_PUBLIC_ID = process.env.NEXT_PUBLIC_PAYMENT_PUBLIC_ID as string;

export const invoiceApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getInvoiceList: builder.query<IInvoice[], { userId: string }>({
        query: params => ({
          url: '/payment/invoice',
          params,
        }),
        providesTags: result => providesList(result, 'Invoice'),
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
      buyCheeseCoins: builder.mutation<IInvoice, PayInvoiceDto>({
        async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          return {
            error: {
              originalStatus: 400,
              data: 'Метод для пополнения чизкоинов, используйте метод для оплаты',
            } as FetchBaseQueryError,
          };

          // const { cardNumber, expDateMonth, expDateYear, cvv, email, invoiceUuid, payerUuid } = args;
          // const checkoutValues = {
          //   cvv,
          //   cardNumber,
          //   expDateMonth,
          //   expDateYear,
          // };

          // let signature: string;
          // try {
          //   const checkout = new cp.Checkout({ publicId: PAYMENT_PUBLIC_ID });
          //   signature = await checkout.createPaymentCryptogram(checkoutValues);
          // } catch (e) {
          //   if (typeof e === 'object' && 'cardNumber' in (e as object)) {
          //     return {
          //       error: {
          //         data: new CardValidationError('Неправильный номер карты'),
          //         originalStatus: 400,
          //       } as any,
          //     };
          //   }

          //   return {
          //     error: {
          //       data: new CardValidationError('Ошибка валидации карты'),
          //       originalStatus: 400,
          //     } as any,
          //   };
          // }

          // const paymentDto: PayServerInvoiceDto = {
          //   signature,
          //   email,
          //   ipAddress: '5.18.144.32',
          //   payerUuid,
          //   currency: 'RUB',
          //   invoiceUuid,
          // };

          // const paymentResult = await fetchWithBQ({
          //   url: '/wallet/wallet-replenish-balance', // TODO: вынести в константы пути
          //   body: paymentDto,
          //   method: 'POST',
          // });

          // if (paymentResult.data) {
          //   const redirectUri = (paymentResult.data as { redirect: string }).redirect;
          //   if (redirectUri) window.open(redirectUri, '_self');
          // }

          // return paymentResult.data
          //   ? { data: paymentResult.data as IInvoice }
          //   : { error: paymentResult.error as FetchBaseQueryError };
        },
        invalidatesTags: ['Wallet', 'Invoice'],
      }),
    };
  },
});

export const { useGetInvoiceListQuery, useGetInvoicePriceQuery, useCreateInvoiceMutation, useBuyCheeseCoinsMutation } =
  invoiceApi;
