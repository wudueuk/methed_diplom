import {Outlet} from 'react-router-dom';
import style from './Layout.module.css';
import Header from '../Header';
import Footer from '../Footer';

export const Layout = () => (
  <>
    <Header />
    <main className={style.main}>
      <div className='container'>
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
);
