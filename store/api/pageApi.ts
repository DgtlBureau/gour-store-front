import { IPage } from 'types/entities/IPage';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

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
