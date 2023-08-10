import { authApi } from "./auth";
import { sigmoidApi } from "./sigmoid";

export const serviceReducer = {
	[authApi.reducerPath]: authApi.reducer,
	[sigmoidApi.reducerPath]: sigmoidApi.reducer
};

export const serviceMiddleware = [authApi.middleware, sigmoidApi.middleware];
