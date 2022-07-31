import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {userRequestAsync} from '../store/userReducer';

export const useUserCurrencies = () => {
  const currencies = useSelector(state => state.user.currencies);
  console.log('currencies: ', currencies);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(userRequestAsync());
  }, [currencies]);

  return [currencies];
};
