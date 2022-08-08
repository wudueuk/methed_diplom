import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {updateToken} from '../../store/token/tokenReducer';

export const Exit = () => {
  const token = useSelector(state => state.token.token);

  const dispatch = useDispatch();

  dispatch(updateToken(false));

  const exitPause = () => {
    setTimeout(() => <Navigate to='/login' replace={true} />, 1000);
  };

  return (
    <>
      {
        token ? '' : exitPause
      }
    </>
  );
};
