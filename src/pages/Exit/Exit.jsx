import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../store/tokenReducer';

export const Exit = () => {
  const dispatch = useDispatch();

  dispatch(updateToken(false));

  return (<Navigate to='/' />);
};
