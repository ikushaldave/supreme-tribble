import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from './constant';
import { RootState } from '@/store';
import { BaseAuthDataRequest, BaseAuthDataResponse, ObjectType } from '@/interface/types';

export const sigmoidApi = createApi({
  reducerPath: 'sigmoidApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.userInfo?.token;
      if (token) {
        headers.set('x-auth-token', token);
      }
      headers.set('framework', 'react');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getDateRange: builder.mutation<BaseAuthDataResponse, BaseAuthDataRequest>({
      query(body) {
        return {
          url: ENDPOINTS.getDateRange,
          method: 'POST',
          body
        };
      }
    }),
    getData: builder.mutation<
      BaseAuthDataResponse & { result: { data: Array<ObjectType> } },
      { orgViewReq: BaseAuthDataRequest } & ObjectType
    >({
      query(body) {
        return {
          url: ENDPOINTS.getData,
          method: 'POST',
          body
        };
      }
    })
  })
});

export const { useGetDateRangeMutation, useGetDataMutation } = sigmoidApi;
