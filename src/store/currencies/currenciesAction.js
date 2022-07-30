import axios from 'axios';
import {API_URL} from '../../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {updateCurrencies} from './currenciesReducer';

export const currenciesRequestAsync = () => {
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  axios({
    method: 'post',
    url: `${API_URL}/login`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then(({data}) => {
      console.log(data.payload);
      dispatch(updateCurrencies(data.payload));
    })
    .catch((error) => console.log(error.message));
};
