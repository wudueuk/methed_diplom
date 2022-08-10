import style from './Exchange.module.css';
/* import classNames from 'classnames'; */
import Button from '../../components/Button';
import Realchange from '../../components/Realchange';
import {useSelector} from 'react-redux';
import {UserCurrencies} from '../../components/UserCurrencies/UserCurrencies';
import {useCurrencies} from '../../hooks/useCurrencies';
import {useRef, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../../api/const';

export const Exchange = () => {
  const token = useSelector(state => state.token.token);
  const currencies = useCurrencies();
  const [amount, setAmount] = useState(0);
  const [exchange, setExchange] = useState(false);
  const [exchangeMessage, setExchangeMessage] = useState('');
  const selectFrom = useRef(null);
  const selectTo = useRef(null);

  if (!token) return;

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
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={style.exchange}>
      <h2 className={style.title}>Обмен валюты</h2>

      <div className={style.inner}>
        <div className={style.box}>
          <div className={style.innerBlock}>
            <h4 className={style.innerTitle}>
              Изменение курса в режиме реального времени
            </h4>
            <Realchange />
          </div>
        </div>

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
            <UserCurrencies />
          </ul>
        </div>
      </div>
    </div>
  );
};
