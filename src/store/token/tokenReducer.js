const initialState = {
  token: false,
};

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const CLEAR_TOKEN = 'CLEAR_TOKEN';

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
  token: false,
});

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case CLEAR_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

