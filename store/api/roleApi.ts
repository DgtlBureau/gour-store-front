import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from "../../http/baseQuery";
import { IClientRole } from '../../@types/entities/IClientRole';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Role'],
  endpoints(builder) {
    return {
      getRoleList: builder.query<IClientRole[], void>({
        query() {
          return {
            method: 'GET',
            url: 'clientRoles',
          }
        },
      }),
      getRole: builder.query<IClientRole, number>({
        query(id) {
          return {
            method: 'GET',
            url: `clientRoles/${id}`,
          }
        },
      }),
    } 
  }
});

export const { useGetRoleQuery, useGetRoleListQuery } = roleApi;
