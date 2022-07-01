import { commonApi } from './commonApi';
import { SignUpDto } from '../../@types/dto/signup.dto';
import { Tokens } from '../../@types/dto/tokens.dto';
import { SignInDto } from '../../@types/dto/signin.dto';
import { Path } from 'constants/routes';
import { IUser } from '../../@types/entities/IUser';
import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';

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
      getCurrentUser: builder.query<IUser, void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
          };
        },
        providesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      updateCurrentUser: builder.mutation<number, UpdateUserDto>({
        query(user) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}}`,
            body: user,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      updateCurrentUserPassword: builder.mutation<number, ChangePasswordDto>({
        query(password) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}}/${Path.CHANGE_PASSWORD}`,
            body: password,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
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
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
  useSignOutMutation,
} = authApi;
