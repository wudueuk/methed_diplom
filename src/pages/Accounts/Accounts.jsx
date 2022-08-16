import style from './Accounts.module.css';
import {useEffect} from 'react';
import Button from '../../components/Button';
import Account from '../../components/Account';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {accountsRequestAsync} from '../../store/accounts/accountsAction';
import {createAccount, updateAccounts}
  from '../../store/accounts/accountsSlice';
import CircleLoader from 'react-spinners/CircleLoader';
import {useToken} from '../../hooks/useToken';
import {useUser} from '../../hooks/useUser';
import axios from 'axios';
import {API_URL} from '../../api/const';

export const Accounts = () => {
  const token = useToken();
  const user = useUser();
  const accounts = useSelector(state => state.accounts.accounts);
  const status = useSelector(state => state.accounts.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(accountsRequestAsync());
    }
  }, [token]);

  const handleSortChange = (e) => {
    const param = e.target.value;
    if (!param) return;

    const tmp = [...accounts];

    if (param === 'transaction') {
      tmp.sort((a, b) => {
        if (a.transactions[0].date < b.transactions[0].date) {
          return 1;
        }
        if (a.transactions[0].date > b.transactions[0].date) {
          return -1;
        }
        return 0;
      });
    } else {
      tmp.sort((a, b) => {
        if (a[param] < b[param]) {
          return 1;
        }
        if (a[param] > b[param]) {
          return -1;
        }
        return 0;
      });
    }

    dispatch(updateAccounts(tmp));
  };

  const createNewAccount = async () => {
    axios({
      method: 'post',
      url: `${API_URL}/create-account`,
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(({data}) => {
        dispatch(createAccount(data.payload));
      })
      .catch((error) => console.log(error.message));
  };

  const override = {
    display: 'block',
    margin: '0 auto'
  };

  return (
    <>
      {token && user ? status === 'loaded' ? (
        <div className={style.accounts}>
          <div className={style.titleBox}>
            <h2 className={style.title}>Здравствуйте, {user}!</h2>
            <Button value='Открыть новый счет' styles={style.open}
              onclick={createNewAccount} />
          </div>
          <div className={style.listHeader}>
            <h3 className={style.listTitle}>Мои счета</h3>
            <div>
              <span>Сортировка по:</span>
              <select className={style.sortParam}
                onChange={handleSortChange}>
                <option value=''>-</option>
                <option value='account'>номеру счета</option>
                <option value='balance'>балансу</option>
                <option value='transaction'>последней транзакции</option>
              </select>
            </div>
          </div>
          <div className={style.accountsList}>
            {accounts.map(elem => <Account key={elem.account}
              data={elem} />)}
          </div>
        </div>
      ) : <CircleLoader color='#FFF' size='250px'
        cssOverride={override} /> : <Navigate to='/login' />}
    </>
  );
};
