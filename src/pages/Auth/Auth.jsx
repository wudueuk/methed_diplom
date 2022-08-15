import style from './Auth.module.css';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../../api/const';
import {updateToken} from '../../store/token/tokenReducer';
import {updateUser} from '../../store/userReducer';
import {useEffect, useState} from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = location?.state?.user || '';
  const passwd = location?.state?.passwd || '';

  const [logined, setLogined] = useState(false);
  const [connectError, setConnectError] = useState('');
  const [loginError, setLoginError] = useState('');

  const echoErrorMessage = message => {
    let outMessage = '';

    switch (message) {
      case 'Invalid password':
        outMessage = 'Неверный пароль';
        break;
      case 'No such user':
        outMessage = 'Пользователь с указанным именем не зарегистрирован';
        break;
      case 'Network Error':
        outMessage = 'Не удается подключиться к серверу';
        break;
      default:
        outMessage = 'Что-то пошло ни так, попробуйде снова';
    }
    return (
      <>
        <h2 className={style.error}>Ошибка</h2>
        <p>{outMessage}</p>
      </>
    );
  };

  useEffect(() => {
    if (user !== '' && passwd !== '') {
      axios({
        method: 'post',
        url: `${API_URL}/login`,
        data: {
          login: user,
          password: passwd,
        },
      })
        .then(({
          data: {
            payload: {token},
            error,
          },
        }) => {
          if (error === '') {
            dispatch(updateToken(token));
            sessionStorage.setItem('token', token);
            dispatch(updateUser(user));
            setLogined(true);
          } else {
            setLoginError(error);
          }
        })
        .catch((error) => {
          setConnectError(error.message);
        });
    } else navigate('/');
  }, []);

  useEffect(() => {
    if (logined) {
      navigate('/');
    }
  }, [logined]);

  const override = {
    display: 'block',
    margin: '0 auto'
  };

  return (
    <>
      {!logined ? connectError ? echoErrorMessage(connectError) :
        loginError ? echoErrorMessage(loginError) :
          (<CircleLoader color='#FFF' size='250px'
            cssOverride={override} />) : <></>
      }
    </>
  );
};

