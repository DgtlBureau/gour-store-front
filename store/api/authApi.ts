import { Path } from 'constants/routes';
import { commonApi } from './commonApi';
import { SignUpDto } from 'types/dto/signup.dto';
import { Tokens } from 'types/dto/tokens.dto';
import { SignInDto } from 'types/dto/signin.dto';
import { PasswordRecoveryDto } from 'types/dto/password-recovery.dto';

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
      sendCode: builder.mutation<void, string>({
        query(phone) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.SEND_CODE}`,
            body: { phone },
          };
        },
      }),
      checkCode: builder.mutation<boolean, string>({
        query(code) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CHECK_CODE}`,
            body: { code },
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
      signOut: builder.mutation<void, void>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.SIGN_OUT}`,
            body,
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
  useSignOutMutation,
  useCheckCodeMutation,
  useRecoverPasswordMutation,
} = authApi;
