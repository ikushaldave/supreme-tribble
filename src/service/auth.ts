import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserRequest, UserResponse } from "../interface/types";
import { BASE_URL } from "./constant";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		authenticateUser: builder.mutation<UserResponse, UserRequest>({
			query: (body) => ({
				url: "signIn",
				method: "POST",
				headers: {
					framework: "react",
				},
				body,
			}),
		}),
	}),
});

export const { useAuthenticateUserMutation } = authApi;
