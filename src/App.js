import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Accounts from './pages/Accounts';
import Detail from './pages/Detail';
import Exchange from './pages/Exchange';
import Exit from './pages/Exit';
import Page404 from './pages/Page404';
import Auth from './pages/Auth';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Accounts />} />
          <Route path='login' element={<Login />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='accounts/:id' element={<Detail />} />
          <Route path='exchange' element={<Exchange />} />
          <Route path='exit' element={<Exit />} />
          <Route path='auth' element={<Auth />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
