import style from './Detail.module.css';
import Button from '../../components/Button';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../api/const';
import classNames from 'classnames';
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
  const [accountChange, setAccountChange] = useState(null);
  const [amount, setAmount] = useState(null);

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

  const handleAccountChange = (e) => {
    setAccountChange(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const transfert = () => {
    axios({
      method: 'post',
      url: `${API_URL}/transfer-funds`,
      params: {
        from: id,
        to: accountChange,
        amount,
      },
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(({data}) => {
        let message = '';
        if (data.payload) {
          message = 'Перевод успешно осуществлен';
        } else if (data.error) {
          switch (data.error) {
            case 'Invalid account from':
              message = `Не указан адрес счёта списания,
              или этот счёт не принадлежит нам`;
              break;
            case 'Invalid account to':
              message = `Не указан счёт зачисления, или этого счёта
              не существует`;
              break;
            case 'Invalid amount':
              message = `Не указана сумма перевода, или она
              отрицательная`;
              break;
            case 'Overdraft prevented':
              message = `Мы попытались перевести больше денег, чем доступно
              на счёте списания`;
              break;
            default:
              message = 'Непредвиденная ошибка!';
          }
        }
        alert(message);
        data.payload ? alert('Перевод осуществлен') : 'Error';
      })
      .catch((error) => console.log(error.message));
  };

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
            {loaded ? <AccountStatistic value={account} /> :
              (<CircleLoader color='#FFF' size='250px'
                cssOverride={override} />)}
          </div>
        </div>

        <div className={style.innerBlock}>
          <h2 className={style.innerTitle}>История переводов</h2>
          <div className={style.history}>
            {loaded ? <Transaction value={account} /> :
              (<CircleLoader color='#FFF' size='250px'
                cssOverride={override} />)}
          </div>
        </div>
      </div>

      <h3 className={style.transitionTitle}>Перевод</h3>
      <div className={style.transition}>
        <div className={style.group}>
          <label className={style.label}>Счет</label>
          <input className={style.input}
            onChange={handleAccountChange}></input>
        </div>
        <div className={style.group}>
          <label className={style.label}>Сумма</label>
          <input className={style.input}
            onChange={handleAmountChange}></input>
        </div>
        <div className={style.group}>
          <Button value='Перевести' styles={style.submit}
            onclick={transfert} />
        </div>
      </div>
    </div>
  );
};
