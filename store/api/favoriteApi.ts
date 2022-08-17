import { commonApi } from './commonApi';
import { IProduct } from '../../@types/entities/IProduct';
import { ProductCreateFavoriteDto } from '../../@types/dto/product/add-favorite.dto';
import { Path } from '../../constants/routes';

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
        providesTags: result =>
          result
            ? [...result.map(({ id }) => ({ type: 'Favorite', id } as const)), { type: 'Favorite', id: 'LIST' }]
            : [{ type: 'Favorite', id: 'LIST' }],
      }),
      createFavoriteProducts: builder.mutation<void, ProductCreateFavoriteDto>({
        query(product) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.FAVORITES}`,
            body: product,
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

export const { useGetFavoriteProductsQuery, useCreateFavoriteProductsMutation, useDeleteFavoriteProductMutation } =
  favoriteApi;
