import {useSelector} from 'react-redux';

export const useToken = () => {
  let token = useSelector(state => state.token.token);

  if (!token) {
    token = sessionStorage.getItem('token');
  } else {
    sessionStorage.setItem('token', token);
  }

  return token;
};
