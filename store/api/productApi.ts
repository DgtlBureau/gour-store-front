import { commonApi } from './commonApi';
import { IProduct } from '../../@types/entities/IProduct';
import { ProductGetOneDto } from '../../@types/dto/product/get-one.dto';
import { Path } from 'constants/routes';

export const productApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getProductList: builder.query<IProduct[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.PRODUCTS,
          };
        },
      }),
      getNoveltiesProductList: builder.query<IProduct[], void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.NOVELTIES}`,
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

export const {
  useGetProductQuery,
  useGetProductListQuery,
  useLazyGetProductQuery,
  useGetNoveltiesProductListQuery,
} = productApi;
