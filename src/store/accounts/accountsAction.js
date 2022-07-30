import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../api/const';

export const accountsRequestAsync = createAsyncThunk(
  'accounts/fetch',
  (id, {getState}) => {
    const token = getState().token.token;

    return axios(
      `${API_URL}/accounts`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(({data}) => {
        const accounts = data.payload;
        return {accounts};
      })
      .catch((err) => ({error: err.toString()}));
  }
);
