import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from "../../http/baseQuery";
import { CurrentUser } from '../../@types/entities/CurrentUser';
import { CurrentUserUpdateDto } from '../../@types/dto/current-user-update.dto';

export const currentUserApi = createApi({
  reducerPath: 'currentUserApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      getCurrentUser: builder.query<CurrentUser, void>({
        query() {
          return {
            method: 'GET',
            url: `client-auth/currentUser`,
          }
        },
      }),
      updateCurrentUser: builder.mutation<CurrentUser, CurrentUserUpdateDto>({
        query(body) {
          return {
            method: 'POST',
            url: `client-auth/currentUser`,
            body,
          }
        },
      }),
    }
  }
})

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } = currentUserApi;
