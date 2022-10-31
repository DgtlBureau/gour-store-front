import { CheckCodeDto } from 'types/dto/check-code.dto';
import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';
import { SendEmailCodeDto } from 'types/dto/profile/send-code.dto';
import { SignInDto } from 'types/dto/signin.dto';
import { SignUpDto } from 'types/dto/signup.dto';
import { Tokens } from 'types/dto/tokens.dto';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

export const authApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      signUp: builder.mutation<void, SignUpDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.SIGN_UP}`,
            body,
          };
        },
      }),
      signIn: builder.mutation<Tokens, SignInDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.SIGN_IN}`,
            body,
          };
        },
      }),
      recoverPassword: builder.mutation<void, PasswordRecoveryDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.RECOVER_PASSWORD}`,
            body,
          };
        },
      }),
      sendEmailCode: builder.mutation<number, SendEmailCodeDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.SEND_EMAIL_CODE}`,
            body,
          };
        },
      }),
      checkCode: builder.mutation<boolean, CheckCodeDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CHECK_CODE}`,
            body,
          };
        },
      }),
      signOut: builder.mutation<void, void>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.SIGN_OUT}`,
            body,
          };
        },
        onQueryStarted(arg, api) {
          api.queryFulfilled.then(() => {
            api.dispatch(authApi.util.resetApiState());
          });
        },
      }),
    };
  },
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSendEmailCodeMutation,
  useSignOutMutation,
  useCheckCodeMutation,
  useRecoverPasswordMutation,
} = authApi;
