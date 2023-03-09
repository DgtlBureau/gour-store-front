import { ICity } from 'types/entities/ICity';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export const cityApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCityList: builder.query<ICity[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.CITIES,
          };
        },
      }),
      getCity: builder.query<ICity, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.CITIES}/${id}`,
          };
        },
      }),
    };
  },
});

export const { useGetCityQuery, useGetCityListQuery,useLazyGetCityListQuery } = cityApi;
