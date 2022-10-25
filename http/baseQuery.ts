import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { HTTP_UNAUTHORIZED } from 'constants/HttpConstants';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === HTTP_UNAUTHORIZED) {
    const refreshResult = await baseQuery({ url: 'client-auth/refresh', method: 'POST' }, api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery({ url: 'client-auth/signout', method: 'POST' }, api, extraOptions);
      return result;
    }
  }

  return result;
};
