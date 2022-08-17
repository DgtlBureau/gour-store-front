import { Path } from 'constants/routes';
import { commonApi } from './commonApi';
import { IPromotion } from '../../@types/entities/IPromotion';

export const promotionApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getPromotionList: builder.query<IPromotion[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.PROMOTIONS,
          };
        },
      }),
      getPromotion: builder.query<IPromotion, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.PROMOTIONS}/${id}`,
          };
        },
      }),
    };
  },
});

export const { useGetPromotionQuery, useGetPromotionListQuery, useLazyGetPromotionQuery } = promotionApi;
