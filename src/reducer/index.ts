import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import CommonReducer from './commonSlice';
import UserReducer from './userSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, UserReducer)

export default {
  common: CommonReducer,
  user: persistedUserReducer
}