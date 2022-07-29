import style from './Detail.module.css';
import Button from '../../components/Button';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../api/const';
import Transaction from '../../components/Transaction';

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
        console.log('data: ', data);
        setLoaded(true);
        setAccount(data.payload);
      })
      .catch((err) => ({error: err.toString()}));
  }, [id]);

  return (
    <div className={style.detail}>
      <div className={style.titleBox}>
        <h2 className={style.title}>Счет № {id}</h2>
        <Button value='Вернуться' styles={style.back}
          onclick={goBack} />
      </div>

      <div className={style.detailInner}>
        <div className={style.innerBlock}>
          <h2 className={style.innerTitle}> </h2>
          <div className={style.innerBody}></div>
        </div>
        <div className={style.innerBlock}>
          <h2 className={style.innerTitle}>История переводов</h2>
          {loaded ? <Transaction value={account} /> : 'loading'}
        </div>
      </div>

      <h3 className={style.transitionTitle}>Перевод</h3>
      <div className={style.transition}>
        <div className={style.group}>
          <label className={style.label}>Счет</label>
          <input className={style.input}></input>
        </div>
        <div className={style.group}>
          <label className={style.label}>Сумма</label>
          <input className={style.input}></input>
        </div>
        <div className={style.group}>
          <Button value='Перевести' styles={style.submit} />
        </div>
      </div>
    </div>
  );
};
