import style from './Menu.module.css';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import {useToken} from '../../../hooks/useToken';

export const Menu = () => {
  const token = useToken();

  return (
    <>
      {
        token ? (
          <ul className={style.menu} >
            <li className={style.item}>
              <NavLink to='/accounts' className={style.link}>Счета</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/exchange' className={style.link}>Обмен</NavLink>
            </li>
            <li className={style.item}>
              <NavLink to='/exit'
                className={classNames(style.link, style.exit)}>Выйти</NavLink>
            </li>
          </ul >
        ) : ''}
    </>

  );
};

