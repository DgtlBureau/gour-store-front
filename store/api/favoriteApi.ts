import { IProduct } from 'types/entities/IProduct';

import { Path } from 'constants/routes';

import { commonApi, providesList } from './commonApi';

export const favoriteApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getFavoriteProducts: builder.query<IProduct[], void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.FAVORITES}`,
          };
        },
        providesTags: result => providesList(result, 'Favorite'),
      }),
      createFavoriteProducts: builder.mutation<void, number>({
        query(productId) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.FAVORITES}`,
            body: { productId },
          };
        },
        invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
      }),
      deleteFavoriteProduct: builder.mutation<void, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.FAVORITES}/${id}`,
          };
        },
        invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
      }),
    };
  },
});

export const {useLazyGetFavoriteProductsQuery, useGetFavoriteProductsQuery, useCreateFavoriteProductsMutation, useDeleteFavoriteProductMutation } =
  favoriteApi;
