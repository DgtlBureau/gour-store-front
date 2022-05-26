import { commonApi } from './commonApi';
import { ICurrentUser } from '../../@types/entities/ICurrentUser';
import { CurrentUserUpdateDto } from '../../@types/dto/current-user-update.dto';
import { Path } from 'constants/routes';

export const currentUserApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getCurrentUser: builder.query<ICurrentUser, void>({
        query() {
          return {
            method: 'GET',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
          }
        },
      }),
      updateCurrentUser: builder.mutation<ICurrentUser, CurrentUserUpdateDto>({
        query(body) {
          return {
            method: 'POST',
            url: `${Path.CLIENT_AUTH}/${Path.CURRENT_USER}`,
            body,
          }
        },
      }),
    }
  }
})

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } = currentUserApi;
