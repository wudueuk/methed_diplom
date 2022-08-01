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
  const [error, setError] = useState('');

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
          },
        }) => {
          dispatch(updateToken(token));
          dispatch(updateUser(user));
          setLogined(true);
        })
        .catch((error) => {
          setError(error);
        });
    } else navigate('/');
  }, []);

  const override = {
    display: 'block',
    margin: '0 auto'
  };

  return (
    <>
      {logined ? navigate('/') :
        error ? (<>
          <h2 className={style.error}>Ошибка</h2>
          <p>{error.message}</p>
        </>) : (<CircleLoader color='#FFF' size='250px'
          cssOverride={override} />)
      }
    </>
  );
};
