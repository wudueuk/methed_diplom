import style from './Exchange.module.css';
import classNames from 'classnames';
import Button from '../../components/Button';

export const Exchange = () => (
  <div className={style.exchange}>
    <h2 className={style.title}>Обмен валюты</h2>

    <div className={style.inner}>
      <div className={classNames(style.innerBlock, style.box)}>
        <h4 className={style.innerTitle}>
          Изменение курса в режиме реального времени
        </h4>
        <ul className={style.realChange}>
          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>AUD/BTC</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>+4,754</li>
            </ul>
          </li>

          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>BTC/BYR</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>+23,2383</li>
            </ul>
          </li>

          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>AUD/BTC</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>+4,754</li>
            </ul>
          </li>

          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>BYR/AUD</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>-7,34</li>
            </ul>
          </li>

          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>CAD/AUD</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>+84,33333</li>
            </ul>
          </li>

          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>CHF/ETH</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>+9,1</li>
            </ul>
          </li>

          <li className={style.realChangeLine}>
            <ul className={style.currencyLine}>
              <li className={style.currencyPair}>JPY/BYR</li>
              <li className={style.underline}> </li>
              <li className={style.currencyDelta}>-12,349</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className={style.innerBlock}>
        <h4 className={style.innerTitle}>Обмен валюты</h4>

        <div className={style.form}>
          <div className={style.group}>
            <label className={style.label}>Откуда</label>
            <select className={style.select}>
              <option>BTC</option>
            </select>
          </div>

          <div className={style.group}>
            <label className={style.label}>Куда</label>
            <select className={style.select}>
              <option>ETH</option>
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
      </div>
    </div>
  </div>
);
