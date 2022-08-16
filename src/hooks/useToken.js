import {useDispatch, useSelector} from 'react-redux';
import {updateToken} from '../store/token/tokenReducer';

export const useToken = () => {
  const dispatch = useDispatch();

  let token = useSelector(state => state.token.token);

  if (!token) {
    token = sessionStorage.getItem('token');
    dispatch(updateToken(token));
  } else {
    sessionStorage.setItem('token', token);
  }

  return token;
};
