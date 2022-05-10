import { createApi } from '@reduxjs/toolkit/query/react'

import { IUser } from '../../@types/entities/IUser';
import { baseQueryWithReauth } from "../../http/baseQuery";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      getCurrentUser: builder.query<IUser, void>({
        query() {
          return {
            method: 'GET',
            url: 'auth/currentUser',
          }
        },
      }),
    }
  }
})

export const { useGetCurrentUserQuery } = authApi;