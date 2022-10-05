import { ICategory } from 'types/entities/ICategory';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

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
    };
  },
});

export const { useGetCategoryQuery, useGetCategoryListQuery } = categoryApi;
