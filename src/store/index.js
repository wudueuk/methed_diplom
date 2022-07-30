import {configureStore} from '@reduxjs/toolkit';
import accountsSlice from './accounts/accountsSlice';
import {tokenReducer} from './token/tokenReducer';
import {userReducer} from './userReducer';
import thunk from 'redux-thunk';
import {currenciesReducer} from './currencies/currenciesReducer';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    accounts: accountsSlice,
    currencies: currenciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),

});
