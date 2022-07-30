const initialState = {
  currencies: [],
};

const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
const CLEAR_CURRENCIES = 'CLEAR_CURRENCIES';

export const updateCurrencies = currencies => ({
  type: UPDATE_CURRENCIES,
  currencies,
});

export const clearCurrencies = () => ({
  type: CLEAR_CURRENCIES,
  currencies: [],
});

export const currenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies,
      };

    case CLEAR_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies,
      };

    default:
      return state;
  }
};

