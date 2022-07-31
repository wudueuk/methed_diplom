import axios from 'axios';
import {API_URL} from '../../api/const';
import {updateCurrencies} from './currenciesReducer';

export const currenciesRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

  axios({
    method: 'get',
    url: `${API_URL}/all-currencies`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then(({data}) => {
      dispatch(updateCurrencies(data.payload));
    })
    .catch((error) => console.log(error.message));
};
