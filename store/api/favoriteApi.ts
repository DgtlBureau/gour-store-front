import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../http/baseQuery';
import { IProduct } from '../../@types/entities/IProduct';
import { ProductCreateFavoriteDto } from '../../@types/dto/product/add-favorite.dto';

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      getFavoriteProducts: builder.query<IProduct[], void>({
        query() {
          return {
            method: 'GET',
            url: `client-auth/currentUser/favorites`,
          };
        },
      }),
      createFavoriteProducts: builder.mutation<void, ProductCreateFavoriteDto>({
        query(product) {
          return {
            method: 'POST',
            url: `client-auth/currentUser/favorites`,
            body: product,
          };
        },
      }),
      deleteFavoriteProduct: builder.mutation<void, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `client-auth/currentUser/favorites/${id}`,
          };
        },
      }),
    };
  },
});

export const {
  useGetFavoriteProductsQuery,
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
} = favoriteApi;
