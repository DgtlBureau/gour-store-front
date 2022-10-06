import { ChangeEmailDto } from 'types/dto/profile/change-email.dto';
import { ChangePasswordDto } from 'types/dto/profile/change-password.dto';
import { UpdateUserDto } from 'types/dto/profile/update-user.dto';
import { ICurrentUser } from 'types/entities/ICurrentUser';

import { Path } from 'constants/routes';

import { commonApi } from './commonApi';

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
      updateCurrentUserEmail: builder.mutation<string, ChangeEmailDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_EMAIL}`,
            body,
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
      updateCurrentAvatar: builder.mutation<void, number | null>({
        query(avatarId) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_AVATAR}`,
            body: { avatarId },
          };
        },
        invalidatesTags: [{ type: 'CurrentUser', id: 1 }],
      }),
      changeMainAddress: builder.mutation<void, number | null>({
        query(addressId) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_MAIN_ADDRESS}`,
            body: { addressId },
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
  useChangeMainAddressMutation,
  useUpdateCurrentUserPasswordMutation,
  useUpdateCurrentAvatarMutation,
  useUpdateCurrentUserEmailMutation,
} = currentUserApi;
