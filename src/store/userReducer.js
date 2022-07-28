const initialState = {
  user: false,
};

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_TOKEN';

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
  user: false,
});

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
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

