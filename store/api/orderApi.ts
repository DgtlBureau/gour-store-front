import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { IOrder } from '../../@types/entities/IOrder';
import { CreateOrderDto } from '../../@types/dto/order/create.dto';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      createOrder: builder.mutation<IOrder, CreateOrderDto>({
        query(product) {
          return {
            method: 'post',
            url: `orders`,
            body: product,
          };
        },
      }),
    };
  },
});

export const { useCreateOrderMutation } = orderApi;
