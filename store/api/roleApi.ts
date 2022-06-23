import { commonApi } from './commonApi';
import { IClientRole } from '../../@types/entities/IClientRole';
import { Path } from 'constants/routes';

export const roleApi = commonApi.injectEndpoints({
  endpoints(builder) {
    return {
      getRoleList: builder.query<IClientRole[], void>({
        query() {
          return {
            method: 'GET',
            url: Path.CLIENT_ROLES,
          }
        },
      }),
      getRole: builder.query<IClientRole, number>({
        query(id) {
          return {
            method: 'GET',
            url: `${Path.CLIENT_ROLES}/${id}`,
          }
        },
      }),
    } 
  }
});

export const { useGetRoleQuery, useGetRoleListQuery } = roleApi;
