import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { IOrderProfile } from '../../@types/entities/IOrderProfile';

export const orderProfileApi = createApi({
  reducerPath: 'orderProfileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['DeliveryProfile'],
  endpoints(builder) {
    return {
      getOrderProfilesList: builder.query<IOrderProfile[], void>({
        query() {
          return {
            method: 'get',
            url: 'order-profiles',
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(
                  ({ id }) => ({ type: 'DeliveryProfile', id } as const)
                ),
                { type: 'DeliveryProfile', id: 'LIST' },
              ]
            : [{ type: 'DeliveryProfile', id: 'LIST' }],
      }),
      createProduct: builder.mutation<IOrderProfile, Partial<IOrderProfile>>({
        query(profile) {
          return {
            method: 'post',
            url: `order-profiles`,
            data: profile,
          };
        },
        invalidatesTags: [{ type: 'DeliveryProfile', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetOrderProfilesListQuery } = orderProfileApi;
