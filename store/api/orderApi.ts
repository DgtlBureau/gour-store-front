import { BaseGetListDto } from 'types/dto/base-get-list.dto';
import { PayInvoiceDto, PayServerInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { CreateOrderDto } from 'types/dto/order/create.dto';
import { I3DSecureDto } from 'types/entities/IInvoice';
import { IOrder } from 'types/entities/IOrder';

import { Path } from 'constants/routes';
import { CardValidationError } from 'errors/CardValidationError';

import { commonApi, providesList } from './commonApi';

const getCardValidationResponse = (err: unknown) => {
  if (typeof err === 'object' && err !== null && 'cardNumber' in err) {
    return {
      error: {
        data: new CardValidationError('Неправильный номер карты'),
        originalStatus: 400,
      } as any,
    };
  }

  return {
    error: {
      data: new CardValidationError('Ошибка валидации карты'),
      originalStatus: 400,
    } as any,
  };
};

export const orderApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrdersList: builder.query<{ orders: IOrder[]; totalCount: number }, BaseGetListDto>({
        query(params) {
          return {
            method: 'GET',
            url: Path.ORDERS,
            params,
          };
        },
        providesTags: result => providesList(result?.orders, 'Order'),
      }),
      createOrder: builder.mutation<IOrder, CreateOrderDto>({
        query(product) {
          return {
            method: 'POST',
            url: Path.ORDERS,
            body: product,
          };
        },
        invalidatesTags: ['Order'],
      }),
      payOrder: builder.mutation<I3DSecureDto, PayInvoiceDto>({
        async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          const { cardNumber, expDateMonth, expDateYear, cvv, email, invoiceUuid, payerUuid } = args;
          const checkoutValues = {
            cvv,
            cardNumber,
            expDateMonth,
            expDateYear,
          };

          let signature: string;
          try {
            const checkout = new cp.Checkout({ publicId: process.env.NEXT_PUBLIC_PAYMENT_PUBLIC_ID as string });
            signature = await checkout.createPaymentCryptogram(checkoutValues);
          } catch (err) {
            return getCardValidationResponse(err);
          }

          const paymentDto: PayServerInvoiceDto = {
            signature,
            email,
            ipAddress: '5.18.144.32',
            payerUuid,
            currency: 'RUB',
            invoiceUuid,
          };

          const createdOrderWithout3DS = await fetchWithBQ({
            url: '/orders/pay-order', // TODO: вынести в константы пути
            body: paymentDto,
            method: 'POST',
          });

          if (createdOrderWithout3DS.error) {
            return {
              error: {
                data: new CardValidationError('Ошибка сервера'),
              },
            };
          }

          const { MD, PaReq, TermUrl, acsUrl } = createdOrderWithout3DS.data as unknown as I3DSecureDto;
          return { data: { MD, PaReq, TermUrl, acsUrl } };
        },
        invalidatesTags: ['Wallet', 'Invoice'],
      }),
    };
  },
});

export const { useGetOrdersListQuery, useCreateOrderMutation, usePayOrderMutation } = orderApi;

// async onQueryStarted(params, { dispatch, queryFulfilled }) {
//   try {
//     const {
//       data: { orders },
//     } = await queryFulfilled;

//     const mergeResult = dispatch(
//       orderApi.util.updateQueryData('getOrdersList', params, draft => {
//         const prevIds = draft.orders.map(order => order.id);
//         const newIds = orders.map(order => order.id);

//         console.log('prev:', prevIds, 'new:', newIds);

//         Object.assign(draft, { orders });
//       }),
//     );
//   } catch (error) {
//     console.log('orders merge error:', error);
//   }
// },
