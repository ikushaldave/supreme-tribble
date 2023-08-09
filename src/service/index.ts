import { authApi } from "./auth";

export const serviceReducer = {
	[authApi.reducerPath]: authApi.reducer,
};

export const serviceMiddleware = [authApi.middleware];
