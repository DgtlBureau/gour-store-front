import { commonApi } from './commonApi';
import { addProductDiscount } from '../../helpers/productHelper';
import { IProduct } from '../../@types/entities/IProduct';
import { ProductGetOneDto } from '../../@types/dto/product/get-one.dto';
import { ProductGetManyDto } from '../../@types/dto/product/get-many.dto';
import { Path } from 'constants/routes';

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
        transformResponse: (products: IProduct[], _, arg) =>
          arg.withPromotions ? products.map(product => addProductDiscount(product)) : products,
      }),
      getNoveltiesProductList: builder.query<IProduct[], ProductGetManyDto>({
        query(params) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.NOVELTIES}`,
            params,
          };
        },
        transformResponse: (products: IProduct[], _, arg) =>
          arg.withPromotions ? products.map(product => addProductDiscount(product)) : products,
      }),
      getProduct: builder.query<IProduct, ProductGetOneDto>({
        query({ id, ...params }) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${id}`,
            params,
          };
        },
        transformResponse: (product: IProduct, _, arg) => (arg.withPromotions ? addProductDiscount(product) : product),
      }),
    };
  },
});

export const { useGetProductQuery, useGetProductListQuery, useLazyGetProductQuery, useGetNoveltiesProductListQuery } =
  productApi;
