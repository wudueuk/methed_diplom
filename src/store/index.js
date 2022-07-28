import {configureStore} from '@reduxjs/toolkit';
import {tokenReducer} from './tokenReducer';
import {userReducer} from './userReducer';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});
