import { commonApi } from './commonApi';
import { ICurrentUser } from '../../@types/entities/ICurrentUser';
import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';
import { Path } from 'constants/routes';
import { ChangePhoneDto } from '../../@types/dto/profile/change-phone.dto';
import { SendCodeDto } from '../../@types/dto/profile/send-code.dto';

export const currentUserApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCurrentUser: builder.query<ICurrentUser, void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
          };
        },
        providesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      updateCurrentUser: builder.mutation<number, UpdateUserDto>({
        query(body) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
            body,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      updateCurrentUserPassword: builder.mutation<number, ChangePasswordDto>({
        query(password) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_PASSWORD}`,
            body: password,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      sendChangePhoneCode: builder.mutation<number, SendCodeDto>({
        query(phone) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.SEND_CODE}`,
            body: phone,
          };
        },
      }),
      updateCurrentUserPhone: builder.mutation<number, ChangePhoneDto>({
        query(dto) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_PHONE}`,
            body: dto,
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      changeCurrentCity: builder.mutation<void, number>({
        query(cityId) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_CITY}`,
            body: { cityId },
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
    };
  },
});

export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useChangeCurrentCityMutation,
  useUpdateCurrentUserPasswordMutation,
  useSendChangePhoneCodeMutation,
  useUpdateCurrentUserPhoneMutation,
} = currentUserApi;
