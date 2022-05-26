import { commonApi } from './commonApi';
import { ICity } from '../../@types/entities/ICity';
import { Path } from '../../constants/routes';

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

export const { useGetCityQuery, useGetCityListQuery } = cityApi;
