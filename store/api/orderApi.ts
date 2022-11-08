import { CreateOrderDto } from 'types/dto/order/create.dto';
import { IOrder } from 'types/entities/IOrder';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export const orderApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrdersList: builder.query<IOrder[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.ORDERS,
          };
        },
        providesTags: ['Wallet'],
      }),
      createOrder: builder.mutation<IOrder, CreateOrderDto>({
        query(product) {
          return {
            method: 'POST',
            url: Path.ORDERS,
            body: product,
          };
        },
        invalidatesTags: ['Wallet'],
      }),
    };
  },
});

export const { useGetOrdersListQuery, useCreateOrderMutation } = orderApi;
