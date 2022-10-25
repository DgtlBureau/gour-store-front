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
      }),
      createProductGrade: builder.mutation<IProductGrade, CreateProductGradeDto>({
        query({ productId, ...body }) {
          return {
            method: 'POST',
            url: `${Path.PRODUCTS}/${productId}/${Path.GRADES}`,
            body,
          };
        },
      }),
    };
  },
});

export const { useCreateProductGradeMutation, useGetProductGradeListQuery } = productGradeApi;
