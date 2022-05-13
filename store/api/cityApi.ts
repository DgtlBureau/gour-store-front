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
      createCity: builder.mutation<ICity, Partial<ICity>>({
        query(city) {
          return {
            method: 'POST',
            url: `cities`,
            data: city
          }
        },
        invalidatesTags: [{ type: 'City', id: 'LIST' }],
      }),
      updateCity: builder.mutation<ICity, Partial<ICity> & Pick<ICity, 'id'>>({
        query(city) {
          return {
            method: 'PUT',
            url: `cities/${city.id}`,
            data: city
          }
        },
        invalidatesTags: (r, e, { id }) => [{ type: 'City', id }],
      }),
      deleteCity: builder.mutation<ICity, number>({
        query(id) {
          return {
            method: 'DELETE',
            url: `cities/${id}`,
          }
        },
        invalidatesTags: [{ type: 'City', id: 'LIST' }],
      })
    }
  }
})

export const {
  useCreateCityMutation,
  useDeleteCityMutation,
  useGetCityQuery,
  useGetCityListQuery,
  useUpdateCityMutation,
} = cityApi;
