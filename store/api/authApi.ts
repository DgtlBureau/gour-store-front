import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../http/baseQuery';
import { RegistrationData } from '../../@types/entities/RegistrationData';
import { Tokens } from '../../@types/dto/tokens.dto';
import { SignInDto } from '../../@types/dto/signin.dto';
import { IUser } from '../../@types/entities/IUser';
import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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
      }),
      updateCurrentUser: builder.mutation<number, UpdateUserDto>({
        query(user) {
          return {
            method: 'PUT',
            url: `client-auth/currentUser`,
            body: user,
          };
        },
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
} = authApi;
