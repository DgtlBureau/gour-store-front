import { CreateProductGradeDto } from 'types/dto/productGrade/create.dto';
import { GetProductGradeListDto } from 'types/dto/productGrade/get-list.dto';
import { IProductGrade } from 'types/entities/IProductGrade';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export const productGradeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getProductGradeList: builder.query<IProductGrade[], GetProductGradeListDto>({
        query({ productId, ...params }) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${productId}/${Path.GRADES}`,
            params,
          };
        },
        providesTags: (_result, _err, arg) => [{ type: 'ProductGrade', id: arg.productId }],
      }),
      getGradeList: builder.query<IProductGrade[], GetProductGradeListDto>({
        query({  ...params }) {
          return {
            method: 'GET',
            url: `${Path.PRODUCTS}/${Path.GRADES}`,
            params,
          };
        },
        providesTags: (_result, _err, arg) => [{ type: 'ProductGrade', id: arg.productId }],
      }),
      createProductGrade: builder.mutation<IProductGrade, CreateProductGradeDto>({
        query({ productId, ...body }) {
          return {
            method: 'POST',
            url: `${Path.PRODUCTS}/${productId}/${Path.GRADES}`,
            body,
          };
        },
        invalidatesTags: (result, _error, arg) => [
          { type: 'Product', id: arg.productId },
          { type: 'ProductGrade', id: arg.productId },
        ],
      }),
    };
  },
});

export const { useCreateProductGradeMutation, useGetProductGradeListQuery, useGetGradeListQuery } = productGradeApi;
