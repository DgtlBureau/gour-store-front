import { ProductGetManyDto } from 'types/dto/product/get-many.dto';
import { ProductGetOneDto } from 'types/dto/product/get-one.dto';
import { ProductGetSimilarDto } from 'types/dto/product/get-similar.dto';
import { IProduct } from 'types/entities/IProduct';

import { Path } from 'constants/routes';

import { commonApi, providesList } from './commonApi';

export const productApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getProductList: builder.query<IProduct[], ProductGetManyDto>({
        query(params) {
          return {
            method: 'GET',
            url: Path.PRODUCTS,
            params,
          };
        },
        providesTags: ['Product'],
      }),
      getNoveltiesProductList: builder.query<IProduct[], ProductGetManyDto>({
        query(params) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.NOVELTIES}`,
            params,
          };
        },
        providesTags: ['Product'],
      }),
      getProduct: builder.query<IProduct, ProductGetOneDto>({
        query({ id, ...params }) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${id}`,
            params,
          };
        },
        providesTags: (_result, _err, { id }) => [{ type: 'Product', id }],
      }),
      getSimilarProductsById: builder.query<IProduct[], ProductGetSimilarDto>({
        query(params) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.SIMILAR}`,
            params,
          };
        },
        providesTags: ['Product'],
      }),
    };
  },
});

export const {
  useGetProductQuery,
  useGetProductListQuery,
  useLazyGetProductQuery,
  useGetNoveltiesProductListQuery,
  useGetSimilarProductsByIdQuery,
} = productApi;
