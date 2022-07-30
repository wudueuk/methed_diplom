import style from './Accounts.module.css';
import {useEffect} from 'react';
import Button from '../../components/Button';
import Account from '../../components/Account';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {accountsRequestAsync} from '../../store/accounts/accountsAction';
import {createAccount} from '../../store/accounts/accountsSlice';
import CircleLoader from 'react-spinners/CircleLoader';
import axios from 'axios';
import {API_URL} from '../../api/const';

export const Accounts = () => {
  const token = useSelector(state => state.token.token);
  const user = useSelector(state => state.user.user);
  const accounts = useSelector(state => state.accounts.accounts);
  const status = useSelector(state => state.accounts.status);
  const dispatch = useDispatch();

  useEffect(() => {
    token ? dispatch(accountsRequestAsync()) : '';
  }, [token]);

  const createNewAccount = () => {
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
              <span>Сортировка:</span>
              <span className={style.sortParam}>По дате</span>
            </div>
          </div>
          <div className={style.accountsList}>
            {accounts.map(elem => <Account key={elem.account} data={elem} />)}
          </div>
        </div>
      ) : <CircleLoader color='#FFF' size='250px'
        cssOverride={override} /> : <Navigate to='/login' />}
    </>
  );
};
