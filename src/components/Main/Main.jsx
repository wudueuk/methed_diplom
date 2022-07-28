import style from './Main.module.css';
import {Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Login from '../../pages/Login';
import Accounts from '../../pages/Accounts';
import Detail from '../../pages/Detail';
import Exchange from '../../pages/Exchange';
import Page404 from '../../pages/Page404';
import Exit from '../../pages/Exit';
import Auth from '../../pages/Auth';

export const Main = () => (
  <main className={style.main}>
    <div className='container'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Accounts />} />
          <Route path='login' element={<Login />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='detail' element={<Detail />} />
          <Route path='exchange' element={<Exchange />} />
          <Route path='exit' element={<Exit />} />
          <Route path='auth' element={<Auth />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  </main>
);
