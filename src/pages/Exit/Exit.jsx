import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/token/tokenReducer';
import {updateUser} from '../../store/userReducer';

export const Exit = () => {
  const dispatch = useDispatch();

  dispatch(updateToken(''));
  dispatch(updateUser(''));
  sessionStorage.clear();

  return <Navigate to='/login' replace={true} />;
};
