import {createSlice} from '@reduxjs/toolkit';
import {accountsRequestAsync} from './accountsAction';

const initialState = {
  accounts: [],
  loading: false,
  error: '',
  status: '',
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    createAccount: (state, action) => {
      state.accounts = [...state.accounts, action.account];
    },
  },
  extraReducers: {
    [accountsRequestAsync.pending.type]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [accountsRequestAsync.fulfilled.type]: (state, action) => {
      state.accounts = action.payload.accounts;
      state.error = '';
      state.status = 'loaded';
    },
    [accountsRequestAsync.rejected.type]: (state, action) => {
      state.error = action.error;
      state.status = 'error';
    },
  },
});

export default accountsSlice.reducer;
