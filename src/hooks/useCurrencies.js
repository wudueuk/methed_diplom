import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {currenciesRequestAsync} from '../store/currencies/currenciesAction';

export const useCurrencies = () => {
  const token = useSelector(state => state.token.token);
  const currencies = useSelector(state => state.currencies.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    dispatch(currenciesRequestAsync());
  }, [token]);

  return currencies;
};
