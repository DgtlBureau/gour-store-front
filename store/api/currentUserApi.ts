import { commonApi } from './commonApi';
import { ICurrentUser } from '../../@types/entities/ICurrentUser';
import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';
import { Path } from 'constants/routes';

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
        query(user) {
          return {
            method: 'PUT',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
            body: user,
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
      changeCurrentCity: builder.mutation<void, number>({
        query(id) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}/${Path.CHANGE_CITY}`,
            body: id,
          };
        },
      }),
    };
  },
});

export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useChangeCurrentCityMutation,
  useUpdateCurrentUserPasswordMutation,
} = currentUserApi;
