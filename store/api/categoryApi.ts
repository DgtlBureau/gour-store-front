import { Path } from 'constants/routes';

import { commonApi } from './commonApi';
import { ICategory, ICategoryWithDiscount } from 'types/entities/ICategory';

export const categoryApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCategoryList: builder.query<ICategory[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.CATEGORIES,
          };
        },
      }),
      getCategory: builder.query<ICategory, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.CATEGORIES}/${id}`,
          };
        },
      }),
      getCategoryListWithDiscount: builder.query<ICategoryWithDiscount[], void>({
        query: () => ({
          method: 'GET',
          url: `${Path.CATEGORIES}/${Path.DISCOUNTS}`,
        }),
      }),
    };
  },
});

export const { useGetCategoryQuery, useGetCategoryListQuery, useGetCategoryListWithDiscountQuery } = categoryApi;
