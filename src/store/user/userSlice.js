import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../api/const';

const initialState = {
  name: '',
  status: null,
  error: null,
  currencies: [],
};

const token = '';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  axios({
    method: 'get',
    url: `${API_URL}/currencies`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then(({data}) => {
      const curr = data.payload;
      const currencies = [];
      for (const key in curr) {
        if (Object.prototype.hasOwnProperty.call(curr, key)) {
          currencies.push({
            code: curr[key].code,
            amount: curr[key].amount
          });
        }
      }
      dispatch(updateUserCurrencies(currencies));
    })
    .catch((error) => console.log(error.message));
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userRequestAsync.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [userRequestAsync.fulfilled.type]: (state, action) => {
      state.currencies = action.payload.accounts;
      state.error = null;
      state.status = 'loaded';
    },
    [userRequestAsync.rejected.type]: (state, action) => {
      state.error = action.error;
      state.status = 'error';
    },
  },
});

export const {createAccount} = accountsSlice.actions;
export default accountsSlice.reducer;
