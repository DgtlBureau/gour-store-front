import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQueryWithReauth } from 'http/baseQuery';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Common',
    'Auth',
    'City',
    'CurrentUser',
    'Order',
    'OrderProfile',
    'Page',
    'Product',
    'PromoCode',
    'ProductGrade',
    'Promotion',
    'Role',
    'Category',
    'Favorite',
    'Invoice',
    'Wallet',
  ],
  endpoints: () => ({}),
});
