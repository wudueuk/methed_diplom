import style from './Logo.module.css';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Image} from './img/logo.svg';

export const Logo = () => (
  <div className={style.logo}>
    <NavLink to='/' className={style.logo}>
      <Image />
      <h1 className={style.title}>C-Money</h1>
    </NavLink>
  </div>
);
