import axios from 'axios';
import {API_URL} from '../api/const';

const initialState = {
  user: false,
  currencies: {},
};

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_CURRENCIES = 'UPDATE_USER_CURRENCIES';
const CLEAR_USER = 'CLEAR_TOKEN';

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
});

export const updateUserName = user => ({
  type: UPDATE_USER_NAME,
  user,
});

export const updateUserCurrencies = currencies => ({
  type: UPDATE_USER_CURRENCIES,
  currencies,
});

export const clearUser = () => ({
  type: CLEAR_USER,
  user: false,
  currencies: [],
});

export const userRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

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
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };

    case UPDATE_USER_NAME:
      return {
        ...state,
        user: action.user,
      };

    case UPDATE_USER_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

