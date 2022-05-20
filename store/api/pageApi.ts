import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { IPage } from '../../@types/entities/IPage';

export const pageApi = createApi({
  reducerPath: 'pageApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Page'],
  endpoints(builder) {
    return {
      getPage: builder.query<IPage, string>({
        query(key) {
          return {
            method: 'GET',
            url: `pages/${key}`,
          };
        },
      }),
    };
  },
});

export const { useGetPageQuery } = pageApi;
