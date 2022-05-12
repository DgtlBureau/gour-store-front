import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from "../../http/baseQuery";
import { ICity } from '../../@types/entities/ICity';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['City'],
  endpoints(builder) {
    return {
      getCityList: builder.query<ICity[], void>({
        query() {
          return {
            method: 'GET',
            url: 'cities',
          }
        },
        providesTags: (result) =>
          result ? [
            ...result.map(({ id }) => ({ type: 'City', id } as const)),
            { type: 'City', id: 'LIST' },
          ] : [{ type: 'City', id: 'LIST' }],
      }),
      getCity: builder.query<ICity, number>({
        query(id) {
          return {
            method: 'GET',
            url: `cities/${id}`,
          }
        },
        providesTags: (r, e, id) => [{ type: 'City', id }],
      }),
    }
  }
})

export const { useGetCityQuery, useGetCityListQuery } = cityApi;