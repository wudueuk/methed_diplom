import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../store/userReducer';

export const useUser = () => {
  const dispatch = useDispatch();

  let user = useSelector(state => state.user.user);

  if (!user) {
    user = sessionStorage.getItem('user');
    dispatch(updateUser(user));
  } else {
    sessionStorage.setItem('user', user);
  }

  return user;
};
