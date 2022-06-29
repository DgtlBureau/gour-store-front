import { IWallet } from '../../@types/entities/IWallet';
import { commonApi } from './commonApi';

export const walletApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCurrentWallet: builder.query<IWallet, void>({
        query() {
          return {
            method: 'GET',
            url: '/wallet',
          };
        },
      }),
      getCurrentBalance: builder.query<number, void>({
        query() {
          return {
            method: 'GET',
            url: `wallet/current-balance`,
          };
        },
      }),
    };
  },
});

export const { useGetCurrentWalletQuery, useGetCurrentBalanceQuery } = walletApi;
