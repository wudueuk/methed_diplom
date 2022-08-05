import style from './Account.module.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

export const Account = ({data}) => (
  <NavLink className={style.link} to={`/accounts/${data.account}`}>
    <div className={style.account} id={data.account}>
      <span className={style.number}>{data.account}</span>
      <span className={style.balance}>{data.balance.toFixed(2)} ₽</span>
      <div className={style.info}>
        <span>Открыт</span>
        <span>последняя операция</span>
        <span>10.03.2020</span>
        <span>{
          data.transactions[0] ?
            new Date(data.transactions[0].date).toLocaleDateString() :
            '-'
        }</span>
      </div>
    </div>
  </NavLink>
);

Account.propTypes = {
  data: PropTypes.object,
};
