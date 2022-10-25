import { IWallet } from 'types/entities/IWallet';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export const walletApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCurrentWallet: builder.query<IWallet, void>({
        query() {
          return {
            method: 'GET',
            url: Path.WALLET,
          };
        },
      }),
      getCurrentBalance: builder.query<number, void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.WALLET}/${Path.CURRENT_BALANCE}`,
          };
        },
      }),
    };
  },
});

export const { useGetCurrentWalletQuery, useGetCurrentBalanceQuery } = walletApi;
