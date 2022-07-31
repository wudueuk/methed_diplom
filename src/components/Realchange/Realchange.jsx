import style from './Realchange.module.css';
import {useState, useRef, useEffect, useCallback} from 'react';

export const Realchange = () => {
  const [data, setData] = useState(null);
  const ws = useRef(null);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      setData(message);
      console.log(data);
    };
  }, [ws]);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3001/currency-feed');
    gettingData();
    return () => ws.current.close();
  }, [ws]);

  return (
    <>
      {!!data &&
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
        </ul>}
    </>
  );
};
