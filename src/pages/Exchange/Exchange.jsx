import style from './Exchange.module.css';
import classNames from 'classnames';
import Button from '../../components/Button';
import Realchange from '../../components/Realchange';
import {useSelector} from 'react-redux';
import {UserCurrencies} from '../../components/UserCurrencies/UserCurrencies';
import {useCurrencies} from '../../hooks/useCurrencies';

export const Exchange = () => {
  const token = useSelector(state => state.token.token);
  const currencies = useCurrencies();

  if (!token) return;

  return (
    <div className={style.exchange}>
      <h2 className={style.title}>Обмен валюты</h2>

      <div className={style.inner}>
        <div className={classNames(style.innerBlock, style.box)}>
          <h4 className={style.innerTitle}>
            Изменение курса в режиме реального времени
          </h4>
          <Realchange />
        </div>

        <div className={style.innerBlock}>
          <h4 className={style.innerTitle}>Обмен валюты</h4>
          <div className={style.form}>
            <div className={style.group}>
              <label className={style.label}>Откуда</label>
              <select className={style.select}>
                {currencies ? currencies.map(elem =>
                  <option key={elem} value={elem}>{elem}</option>
                ) : (<option> - </option>)}
              </select>
            </div>

            <div className={style.group}>
              <label className={style.label}>Куда</label>
              <select className={style.select}>
                {currencies ? currencies.map(elem =>
                  <option key={elem} value={elem}>{elem}</option>
                ) : (<option> - </option>)}
              </select>
            </div>

            <div className={style.group}>
              <label className={style.label}>Сумма</label>
              <input className={style.input} />
            </div>
          </div>
          <div className={style.left}>
            <Button value='Обменять' styles={style.submit} />
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
