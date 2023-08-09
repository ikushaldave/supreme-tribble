import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";

import { serviceReducer, serviceMiddleware } from "../service";

export const store = configureStore({
	reducer: {
		common: commonSlice,
		...serviceReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
