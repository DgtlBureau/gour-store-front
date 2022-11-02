import { IInvoice } from 'types/entities/IInvoice';
import { IWallet } from 'types/entities/IWallet';
import { IWalletTransaction } from 'types/entities/IWalletTransaction';

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
      getCurrentTransactions: builder.query<IWalletTransaction[], void>({
        query() {
          return {
            url: `${Path.WALLET}/${Path.CURRENT_TRANSACTIONS}`,
          };
        },
        providesTags: ['Wallet'],
      }),
    };
  },
});

export const { useGetCurrentWalletQuery, useGetCurrentBalanceQuery, useGetCurrentTransactionsQuery } = walletApi;
