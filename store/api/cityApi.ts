import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../http/baseQuery';
import { ICity } from '../../@types/entities/ICity';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['City'],
  endpoints(builder) {
    return {
      getCitiesList: builder.query<ICity[], void>({
        query() {
          return {
            method: 'get',
            url: 'cities',
          };
        },
        providesTags: result =>
          result
            ? [
                ...result.map(({ id }) => ({ type: 'City', id } as const)),
                { type: 'City', id: 'LIST' },
              ]
            : [{ type: 'City', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetCitiesListQuery } = cityApi;
