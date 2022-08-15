import style from './UserCurrencies.module.css';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../../api/const';
import {updateUserCurrencies} from '../../store/userReducer';
import {useToken} from '../../hooks/useToken';

export const UserCurrencies = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    if (!token) return;

    axios({
      method: 'get',
      url: `${API_URL}/currencies`,
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(({data}) => {
        const curr = data.payload;
        const array = [];
        for (const key in curr) {
          if (Object.prototype.hasOwnProperty.call(curr, key)) {
            array.push({
              code: curr[key].code,
              amount: curr[key].amount
            });
          }
        }
        setCurrencies(array);
        dispatch(updateUserCurrencies(array));
      })
      .catch((error) => console.log(error.message));
  }, [token]);

  return (
    <>
      {
        currencies.length > 0 ? currencies.map(elem => {
          if (elem.amount > 0) {
            return (
              <li key={elem.code} className={style.userCurrenciesLi}>
                <span className={style.userCurrencies}>
                  {elem.code}
                </span>
                <span className={classNames(style.userCurrencies, style.bold)}>
                  {elem.amount.toFixed(2)}
                </span>
              </li>
            );
          }
        }) : (<li><span>Счета отсутствуют</span></li>)
      }
    </>
  );
};
