import style from './Realchange.module.css';
import {useRef, useEffect, useCallback} from 'react';
import {API_WS} from '../../api/const';
import {useToken} from '../../hooks/useToken';

export const Realchange = () => {
  const token = useToken();
  const ws = useRef(null);

  if (!token) return;

  let count = 0;

  const ws = useRef(null);
  const gettingData = useCallback(() => {
    if (!ws.current) return;

    let count = 0;

    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      const change = {
        from: message.from,
        to: message.to,
        rate: message.rate,
        change: message.change,
      };
      if (message.type === 'EXCHANGE_RATE_CHANGE') {
        const realChange = document.getElementById('realChange');

        const realChangeLine = document.createElement('li');
        realChangeLine.className = style.realChangeLine;
        realChangeLine.id = `count${count}`;

        const currencyLine = document.createElement('ul');
        currencyLine.className = style.currencyLine;

        const currencyPair = document.createElement('li');
        currencyPair.className = style.currencyPair;
        currencyPair.innerText = `${change.from}/${change.to}`;

        const underline = document.createElement('li');
        underline.className = style.underline;

        const currencyDelta = document.createElement('li');
        currencyDelta.className = change.change > 0 ?
          style.currencyDeltaGreen : style.currencyDeltaRed;
        currencyDelta.innerText = change.rate;

        currencyLine.append(currencyPair, underline, currencyDelta);
        realChangeLine.append(currencyLine);

        realChange.prepend(realChangeLine);
        count++;
        if (count >= 15) {
          const deleteLine = document.getElementById(`count${count - 15}`);
          deleteLine.remove();
        }
      }
    };
  }, [ws]);

  useEffect(() => {
    ws.current = new WebSocket(API_WS);
    gettingData();
    return () => ws.current.close();
  }, [ws]);

  return <ul className={style.realChange} id='realChange'></ul>;
};
