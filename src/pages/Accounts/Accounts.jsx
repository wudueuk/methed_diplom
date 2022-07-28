import style from './Accounts.module.css';
import Button from '../../components/Button';
import Account from '../../components/Account';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export const Accounts = () => {
  const token = useSelector(state => state.token.token);
  const user = useSelector(state => state.user.user);

  return (
    <>
      {token ? (
        <div className={style.accounts}>
          <div className={style.titleBox}>
            <h2 className={style.title}>Здравствуйте, {user}!</h2>
            <Button value='Открыть новый счет' styles={style.open} />
          </div>
          <div className={style.listHeader}>
            <h3 className={style.listTitle}>Мои счета</h3>
            <div>
              <span>Сортировка:</span>
              <span className={style.sortParam}>По дате</span>
            </div>
          </div>
          <div className={style.accountsList}>
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
            <Account />
          </div>
        </div>
      ) : <Navigate to='/login' />}
    </>
  );
};
