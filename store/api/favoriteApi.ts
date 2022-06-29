import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../http/baseQuery';
import { IProduct } from '../../@types/entities/IProduct';
import { ProductCreateFavoriteDto } from '../../@types/dto/product/add-favorite.dto';
import { commonApi } from './commonApi';

export const favoriteApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getFavoriteProducts: builder.query<IProduct[], void>({
        query() {
          return {
            method: 'GET',
            url: `client-auth/currentUser/favorites`,
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'Favorite', id } as const)),
                { type: 'Favorite', id: 'LIST' },
              ]
            : [{ type: 'Favorite', id: 'LIST' }],
      }),
      createFavoriteProducts: builder.mutation<void, ProductCreateFavoriteDto>({
        query(product) {
          return {
            method: 'POST',
            url: `client-auth/currentUser/favorites`,
            body: product,
          };
        },
        invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
      }),
      deleteFavoriteProduct: builder.mutation<void, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `client-auth/currentUser/favorites/${id}`,
          };
        },
        invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
      }),
    };
  },
});

export const {
  useGetFavoriteProductsQuery,
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
} = favoriteApi;
