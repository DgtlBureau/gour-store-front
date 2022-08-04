import { commonApi } from './commonApi';
import { IProduct } from '../../@types/entities/IProduct';
import { ProductGetOneDto } from '../../@types/dto/product/get-one.dto';
import { ProductGetManyDto } from '../../@types/dto/product/get-many.dto';
import { Path } from '../../constants/routes';

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
      }),
      getNoveltiesProductList: builder.query<IProduct[], ProductGetManyDto>({
        query(params) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.NOVELTIES}`,
            params,
          };
        },
      }),
      getProduct: builder.query<IProduct, ProductGetOneDto>({
        query({ id, ...params }) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${id}`,
            params,
          };
        },
      }),
    };
  },
});

export const { useGetProductQuery, useGetProductListQuery, useLazyGetProductQuery, useGetNoveltiesProductListQuery } =
  productApi;
