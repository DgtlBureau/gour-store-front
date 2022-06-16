import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { IOrderProfile } from '../../@types/entities/IOrderProfile';
import { CreateOrderProfileDto } from '../../@types/dto/order/createOrderProfile.dto';

export const orderProfileApi = createApi({
  reducerPath: 'orderProfileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['DeliveryProfile'],
  endpoints(builder) {
    return {
      getOrderProfilesList: builder.query<IOrderProfile[], void>({
        query() {
          return {
            method: 'GET',
            url: 'order-profiles',
          };
        },
        providesTags: result => {
          console.log('result ', result);
          return result ? (
          [
            ...result.map(({ id }) => ({ type: 'DeliveryProfile', id } as const)),
            { type: 'DeliveryProfile', id: 'LIST' },
          ]
        ) : (
          [{ type: 'DeliveryProfile', id: 'LIST' }]
        )
      }}),
      createOrderProfile: builder.mutation<
        IOrderProfile,
        CreateOrderProfileDto
      >({
        query(profile) {
          return {
            method: 'POST',
            url: `order-profiles`,
            body: profile,
          };
        },
        invalidatesTags: [{ type: 'DeliveryProfile', id: 'LIST' }],
      }),
      updateOrderProfile: builder.mutation<
        IOrderProfile,
        Partial<CreateOrderProfileDto> & Pick<IOrderProfile, 'id'>
      >({
        query({ id, ...body }) {
          return {
            method: 'PUT',
            url: `order-profiles/${id}`,
            body,
          };
        },
        invalidatesTags: [{ type: 'DeliveryProfile', id: 'LIST' }],
      }),
      deleteOrderProfile: builder.mutation<void, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `order-profiles/${id}`,
          };
        },
        invalidatesTags: [{ type: 'DeliveryProfile', id: 'LIST' }],
      })
    };
  },
});

export const {
  useGetOrderProfilesListQuery,
  useCreateOrderProfileMutation,
  useUpdateOrderProfileMutation,
  useDeleteOrderProfileMutation,
} = orderProfileApi;
