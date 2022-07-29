import style from './Account.module.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

export const Account = ({data}) => (
  <NavLink className={style.link} to={`/accounts/${data.account}`}>
    <div className={style.account} id={data.account}>
      <span className={style.number}>{data.account}</span>
      <span className={style.balance}>{data.balance} ₽</span>
      <div className={style.info}>
        <span>Открыт</span>
        <span>последняя операция</span>
        <span>10.03.2020</span>
        <span>24.07.2022</span>
      </div>
    </div>
  </NavLink>
);

Account.propTypes = {
  data: PropTypes.object,
};
