import style from './Header.module.css';
import Logo from './Logo';
import Menu from './Menu';

export const Header = () => (
  <header className={style.header}>
    <div className='container mainmenu'>
      <Logo />
      <Menu />
    </div>
  </header>
);
