import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateProductGrade } from '../../@types/dto/productGrade/create';
import { IProductGrade } from '../../@types/entities/IProductGrade';
import { baseQueryWithReauth } from '../../http/baseQuery';

export const productApi = createApi({
  reducerPath: 'productGradeApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      createProductGrade: builder.mutation<IProductGrade, CreateProductGrade>({
        query({ productId, ...body }) {
          return {
            method: 'post',
            url: `products/${productId}/grades`,
            body,
          };
        },
      }),
    };
  },
});

export const { useCreateProductGradeMutation } = productApi;
