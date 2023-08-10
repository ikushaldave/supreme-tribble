import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserRequest, UserResponse } from '../interface/types';
import { HOST_URL, ENDPOINTS } from './constant';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: HOST_URL }),
  endpoints: (builder) => ({
    authenticateUser: builder.mutation<UserResponse, UserRequest>({
      query: (body) => ({
        url: ENDPOINTS.login,
        method: 'POST',
        headers: {
          framework: 'react'
        },
        body
      })
    })
  })
});

export const { useAuthenticateUserMutation } = authApi;
