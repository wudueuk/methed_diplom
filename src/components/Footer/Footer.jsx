import style from './Footer.module.css';
import Logo from '../Header/Logo';

export const Footer = () => (
  <footer className={style.footer}>
    <div className='container'>
      <div className={style.footerInner}>
        <Logo />
        <span>&copy; C-Money, 2022</span>
      </div>
    </div>
  </footer>
);
