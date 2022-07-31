import style from './UserCurrencies.module.css';
import classNames from 'classnames';
import {useUserCurrencies} from '../../hooks/useUserCurrencies';

export const UserCurrencies = () => {
  const userCurrencies = useUserCurrencies();
  console.log('userCurrencies: ', userCurrencies);

  return (
    <>
      {
        userCurrencies ? userCurrencies[0].map(elem =>
          <li key={elem.code} className={style.userCurrenciesLi}>
            <span className={style.userCurrencies}>
              {elem.code}
            </span>
            <span className={classNames(style.userCurrencies, style.bold)}>
              {elem.amount}
            </span>
          </li>
        ) : (<li><span>Счета отсутствуют</span></li>)
      }
    </>
  );
};
