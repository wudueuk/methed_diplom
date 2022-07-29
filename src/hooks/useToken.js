import {useSelector} from 'react-redux';

export const useToken = () => {
  let token = useSelector(state => state.token.token);

  if (!token) {
    token = localStorage.getItem('token');
  } else {
    localStorage.setItem('token', token);
  }

  return token;
};
