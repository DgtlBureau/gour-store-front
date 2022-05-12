import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from "../../http/baseQuery";
import { RegistrationData } from '../../@types/entities/RegistrationData';
import { Tokens } from '../../@types/dto/tokens.dto';
import { SignInDto } from '../../@types/dto/signin.dto';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints(builder) {
    return {
      signUp: builder.mutation<void, RegistrationData>({
        query(data) {
          return {
            method: 'POST',
            url: `auth/signup`,
            data,
          }
        },
      }),
      signIn: builder.mutation<Tokens, SignInDto>({
        query(data) {
          return {
            method: 'POST',
            url: `auth/signin`,
            data,
          }
        },
      }),
      sendCode: builder.mutation<void, string>({
        query(phone) {
          return {
            method: 'POST',
            url: `auth/sendCode`,
            data: { phone },
          }
        },
      }),
    }
  }
})

export const { useSignUpMutation, useSignInMutation, useSendCodeMutation } = authApi;
