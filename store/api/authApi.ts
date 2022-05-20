import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../http/baseQuery';
import { RegistrationData } from '../../@types/entities/RegistrationData';
import { Tokens } from '../../@types/dto/tokens.dto';
import { SignInDto } from '../../@types/dto/signin.dto';
import { IUser } from '../../@types/entities/IUser';
import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CurrentUser'],
  endpoints(builder) {
    return {
      signUp: builder.mutation<void, RegistrationData>({
        query(body) {
          return {
            method: 'POST',
            url: `client-auth/signup`,
            body,
          };
        },
      }),
      signIn: builder.mutation<Tokens, SignInDto>({
        query(body) {
          return {
            method: 'POST',
            url: `client-auth/signin`,
            body,
          };
        },
      }),
      sendCode: builder.mutation<void, string>({
        query(phone) {
          return {
            method: 'POST',
            url: `client-auth/sendCode`,
            body: { phone },
          };
        },
      }),
      getCurrentUser: builder.query<IUser, void>({
        query() {
          return {
            method: 'GET',
            url: `client-auth/currentUser`,
          };
        },
        providesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      updateCurrentUser: builder.mutation<number, UpdateUserDto>({
        query(user) {
          return {
            method: 'PUT',
            url: `client-auth/currentUser`,
            body: user,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      updateCurrentUserPassword: builder.mutation<number, ChangePasswordDto>({
        query(password) {
          return {
            method: 'POST',
            url: `client-auth/currentUser/change-password`,
            body: password,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
    };
  },
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSendCodeMutation,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
} = authApi;
