import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { IOrder } from '../../@types/entities/IOrder';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      createOrder: builder.mutation<IOrder, Partial<IOrder>>({
        query(product) {
          return {
            method: 'post',
            url: `orders`,
            data: product,
          };
        },
      }),
    };
  },
});

export const { useCreateOrderMutation } = orderApi;
