import style from './ExchangeMoney.module.css';
import Button from '../Button';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {useToken} from '../../hooks/useToken';
import {useCurrencies} from '../../hooks/useCurrencies';
import {updateUserCurrencies} from '../../store/userReducer';
import axios from 'axios';
import {API_URL} from '../../api/const';

export const ExchangeMoney = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [exchangeMessage, setExchangeMessage] = useState('');
  const [exchange, setExchange] = useState(false);
  const [userCurrencies, setUserCurrencies] = useState([]);
  const selectFrom = useRef(null);
  const selectTo = useRef(null);
  const currencies = useCurrencies();
  const [exchangeId, setExchangeId] = useState(1);

  useEffect(() => {
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
        setUserCurrencies(array);
        dispatch(updateUserCurrencies(array));
      })
      .catch((error) => console.log(error.message));
  }, [exchangeId]);

  const handleChangeAmount = e => {
    setAmount(e.target.value);
  };

  const exchangeMoney = async () => {
    axios({
      method: 'post',
      url: `${API_URL}/currency-buy`,
      data: {
        from: selectFrom.current.value,
        to: selectTo.current.value,
        amount,
      },
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(({data}) => {
        let message = '';
        if (data.payload) {
          message = 'Перевод успешно осуществлен';
          setExchange(true);
        } else if (data.error) {
          switch (data.error) {
            case 'Unknown currency code':
              message = `Передан неверный валютный код, либо код не
              поддерживается системой (валютный код списания или
                валютный код зачисления)`;
              break;
            case 'Not enough currency':
              message = `На валютном счёте списания нет средств`;
              break;
            case 'Overdraft prevented':
              message = `Попытка перевести больше, чем доступно на
                счёте списания`;
              break;
            case 'Invalid amount':
              message = `Не указана сумма перевода, или она
              отрицательная`;
              break;
            default:
              message = 'Непредвиденная ошибка!';
          }
          setExchange(false);
        }
        setExchangeMessage(message);
        setExchangeId(Math.floor(Math.random(1) * Date.now()));
        document.getElementById('exchangeAmount').value = '';
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div>
        <div className={style.innerBlock}>
          <h4 className={style.innerTitle}>Обмен валюты</h4>
          <div className={style.form}>
            <div className={style.group}>
              <label className={style.label}>Откуда</label>
              <select className={style.select}
                ref={selectFrom}>
                {currencies ? currencies.map(elem =>
                  <option key={elem} value={elem}>{elem}</option>
                ) : (<option> - </option>)}
              </select>
            </div>

            <div className={style.group}>
              <label className={style.label}>Куда</label>
              <select className={style.select}
                ref={selectTo}>
                {currencies ? currencies.map(elem =>
                  <option key={elem} value={elem}>{elem}</option>
                ) : (<option> - </option>)}
              </select>
            </div>

            <div className={style.group}>
              <label className={style.label}>Сумма</label>
              <input className={style.input}
                onChange={handleChangeAmount}
                id='exchangeAmount'
              />
            </div>
          </div>
          <div className={style.infoGroup}>
            <p className={exchange ? style.exchangeMessageOk :
              style.exchangeMessageError}>{exchangeMessage}</p>
            <Button value='Обменять' styles={style.submit}
              onclick={exchangeMoney} />
          </div>
        </div>
      </div>

      <div className={style.balance}>
        <h4 className={style.balanceTitle}>Мои валюты</h4>
        <ul>
          {
            userCurrencies.length > 0 ? userCurrencies.map(elem => {
              if (elem.amount > 0) {
                return (
                  <li key={elem.code} className={style.userCurrenciesLi}>
                    <span className={style.userCurrencies}>
                      {elem.code}
                    </span>
                    <span className={classNames(style.userCurrencies,
                      style.bold)}>
                      {elem.amount.toFixed(2)}
                    </span>
                  </li>
                );
              }
            }) : (<li><span>Счета отсутствуют</span></li>)
          }
        </ul>
      </div>
    </>);
};
