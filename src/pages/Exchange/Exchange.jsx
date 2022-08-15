import style from './Exchange.module.css';
import Realchange from '../../components/Realchange';
import {useToken} from '../../hooks/useToken';
import {ExchangeMoney} from '../../components/ExchangeMoney/ExchangeMoney';

export const Exchange = () => {
  const token = useToken();

  if (!token) return;

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

        <ExchangeMoney />

      </div>
    </div>
  );
};
