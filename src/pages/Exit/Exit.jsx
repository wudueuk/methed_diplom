import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/token/tokenReducer';

export const Exit = () => {
  const dispatch = useDispatch();

  dispatch(updateToken(''));
  sessionStorage.clear();

  return <Navigate to='/login' replace={true} />;
};
