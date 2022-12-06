import { IPromoCode } from 'types/entities/IPromoCode';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export type CheckPromoCodeDto = {
  key: string;
};

export const promoCodeApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      applyPromoCode: builder.mutation<IPromoCode, CheckPromoCodeDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.PROMOCODES}/${Path.APPLY}`,
            body,
          };
        },
      }),
    };
  },
});

export const { useApplyPromoCodeMutation } = promoCodeApi;
