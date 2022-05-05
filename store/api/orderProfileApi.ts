import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { IOrderProfile } from '../../@types/entities/IOrderProfile';

export const orderProfileApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      getOrderProfilesList: builder.query<IOrderProfile[], void>({
        query() {
          return {
            method: 'get',
            url: 'order-profiles',
          };
        },
      }),
      createProduct: builder.mutation<IOrderProfile, Partial<IOrderProfile>>({
        query(profile) {
          return {
            method: 'post',
            url: `order-profiles`,
            data: profile,
          };
        },
      }),
    };
  },
});

export const { useGetOrderProfilesListQuery } = orderProfileApi;
