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
        providesTags: ['CurrentUser'],
      }),
      updateCurrentUser: builder.mutation<number, UpdateUserDto>({
        query(body) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
            body,
          };
        },
        invalidatesTags: ['CurrentUser'],
      }),
      updateCurrentUserPassword: builder.mutation<number, ChangePasswordDto>({
        query(password) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_PASSWORD}`,
            body: password,
          };
        },
        invalidatesTags: ['CurrentUser'],
      }),
      updateCurrentUserEmail: builder.mutation<string, ChangeEmailDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_EMAIL}`,
            body,
          };
        },
        invalidatesTags: ['CurrentUser'],
      }),
      changeCurrentCity: builder.mutation<void, number>({
        query(cityId) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_CITY}`,
            body: { cityId },
          };
        },
        invalidatesTags: ['CurrentUser'],
      }),
      updateCurrentAvatar: builder.mutation<void, number | null>({
        query(avatarId) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_AVATAR}`,
            body: { avatarId },
          };
        },
        invalidatesTags: ['CurrentUser'],
      }),
      changeMainAddress: builder.mutation<void, number | null>({
        query(addressId) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_MAIN_ADDRESS}`,
            body: { addressId },
          };
        },
        invalidatesTags: ['CurrentUser'],
      }),
      reduceGameLive: builder.mutation<void, void>({
        query() {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.REDUCE_GAME_LIVE}`,
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
  useReduceGameLiveMutation,
  useChangeCurrentCityMutation,
  useChangeMainAddressMutation,
  useUpdateCurrentUserPasswordMutation,
  useUpdateCurrentAvatarMutation,
  useUpdateCurrentUserEmailMutation,
} = currentUserApi;
