import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import sliceReducer from '../reducer';
import { serviceReducer, serviceMiddleware } from '../service';

export const store = configureStore({
  reducer: {
    ...sliceReducer,
    ...serviceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serviceMiddleware)
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
