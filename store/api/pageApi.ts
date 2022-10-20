import { Path } from 'constants/routes';

import { IPage } from 'types/entities/IPage';

import { commonApi } from './commonApi';

type PageKeys = 'MAIN' | 'PURCHASE' | 'PRIVACY' | 'COOKIE' | 'AGREEMENT';

export const pageApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getPage: builder.query<IPage, string>({
        query(key) {
          return {
            method: 'GET',
            url: `${Path.PAGES}/${key}`,
          };
        },
      }),
    };
  },
});

export const { useGetPageQuery } = pageApi;
