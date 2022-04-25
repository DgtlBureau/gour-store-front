import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateProductGradeDto } from '../../@types/dto/productGrade/create.dto';
import { GetProductGradeListDto } from '../../@types/dto/productGrade/get-list.dto';
import { IProductGrade } from '../../@types/entities/IProductGrade';
import { baseQueryWithReauth } from '../../http/baseQuery';

export const productGradeApi = createApi({
  reducerPath: 'productGradeApi',
  tagTypes: ['ProductGrade'],
  baseQuery: baseQueryWithReauth,

  endpoints(builder) {
    return {
      getProductGradeList: builder.query<
        IProductGrade[],
        GetProductGradeListDto
      >({
        query({ productId }) {
          return {
            method: 'get',
            url: `products/${productId}/grades`,
          };
        },
      }),
      createProductGrade: builder.mutation<
        IProductGrade,
        CreateProductGradeDto
      >({
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

export const { useCreateProductGradeMutation, useGetProductGradeListQuery } =
  productGradeApi;
