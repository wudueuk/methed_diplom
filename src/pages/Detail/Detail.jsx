import style from './Detail.module.css';
import Button from '../../components/Button';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../api/const';
import classNames from 'classnames';
import TransactionHistory from '../../components/TransactionHistory';
import Transaction from '../../components/Transaction';
import CircleLoader from 'react-spinners/CircleLoader';
import DetailChart from '../../components/DetailChart';
import AccountStatistic from '../../components/AccountStatistic';

export const Detail = () => {
  const token = useSelector(state => state.token.token);
  const {id} = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState(null);

  const goBack = () => navigate(-1);

  useEffect(() => {
    axios(
      `${API_URL}/account/${id}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(({data}) => {
        setLoaded(true);
        setAccount(data.payload);
      })
      .catch((err) => ({error: err.toString()}));
  }, [id]);

  const override = {
    display: 'block',
    margin: '0 auto'
  };

  return (
    <div className={style.detail}>
      <div className={style.titleBox}>
        <h2 className={style.title}>Счет № {id}</h2>
        <Button value='Вернуться' styles={style.back}
          onclick={goBack} />
      </div>

      <div className={style.detailInner}>
        <div className={style.innerBlock}>
          <h2 className={classNames(style.innerTitle, style.hidden)}>
            Динамика
          </h2>
          <div className={style.innerBody}>
            {loaded ? <DetailChart value={account} /> :
              (<CircleLoader color='#FFF' size='250px'
                cssOverride={override} />)}
          </div>

          <div className={style.innerBlock}>
            <h2 className={classNames(style.innerTitle, style.marginTop)}>
              Статистика
            </h2>
            <div className={style.doughnut}>
              {loaded ? <AccountStatistic value={account} /> :
                (<CircleLoader color='#FFF' size='250px'
                  cssOverride={override} />)}
            </div>
          </div>
        </div>

        <div className={style.innerBlock}>
          <h2 className={style.innerTitle}>История переводов</h2>
          <div className={style.history}>
            {loaded ? <TransactionHistory value={account} /> :
              (<CircleLoader color='#FFF' size='250px'
                cssOverride={override} />)}
          </div>
        </div>
      </div>

      <Transaction account={id} />
    </div>
  );
};
