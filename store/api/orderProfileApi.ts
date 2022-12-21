import { CreateOrderProfileDto } from 'types/dto/order/createOrderProfile.dto';
import { IOrderProfile } from 'types/entities/IOrderProfile';

import { Path } from 'constants/routes';

import { commonApi, providesList } from './commonApi';

export const orderProfileApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getOrderProfilesList: builder.query<IOrderProfile[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.ORDER_PROFILES,
          };
        },
        providesTags: result => providesList(result, 'OrderProfile'),
      }),
      createOrderProfile: builder.mutation<IOrderProfile, CreateOrderProfileDto>({
        query(profile) {
          return {
            method: 'POST',
            url: Path.ORDER_PROFILES,
            body: profile,
          };
        },
        invalidatesTags: [{ type: 'OrderProfile', id: 'LIST' }],
      }),
      updateOrderProfile: builder.mutation<IOrderProfile, Partial<CreateOrderProfileDto> & Pick<IOrderProfile, 'id'>>({
        query({ id, ...body }) {
          return {
            method: 'PUT',
            url: `${Path.ORDER_PROFILES}/${id}`,
            body,
          };
        },
        invalidatesTags: [{ type: 'OrderProfile', id: 'LIST' }],
      }),
      deleteOrderProfile: builder.mutation<void, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.ORDER_PROFILES}/${id}`,
          };
        },
        invalidatesTags: [{ type: 'OrderProfile', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useGetOrderProfilesListQuery,
  useCreateOrderProfileMutation,
  useUpdateOrderProfileMutation,
  useDeleteOrderProfileMutation,
} = orderProfileApi;
