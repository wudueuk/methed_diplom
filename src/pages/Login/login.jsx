import style from './Login.module.css';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
  const token = useSelector(state => state.token.token);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPasswd, setUserPasswd] = useState('');

  const handleUserChange = (e) => {
    const target = e.target;
    setUserName(target.value);
  };

  const handlePasswdChange = (e) => {
    const target = e.target;
    setUserPasswd(target.value);
  };

  const handleSubmit = () => {
    console.log('Check user name and user password');
    navigate('/auth',
      {
        state:
        {
          user: userName,
          passwd: userPasswd,
        }
      });
  };

  return (<>
    {token ? navigate('/') : (
      <div className={style.body}>
        <h2 className={style.title}>Вход в аккаунт</h2>
        <div className={style.group}>
          <label className={style.label}>Логин</label>
          <input className={style.input} name='login' type='text'
            value={userName} onChange={handleUserChange} />
        </div>
        <div className={style.group}>
          <label className={style.label}>Пароль</label>
          <input className={style.input} name='passwd' type='password'
            value={userPasswd} onChange={handlePasswdChange} />
        </div>
        <div onClick={handleSubmit}>
          <Button value='Войти' styles={style.button} />
        </div>
      </div>
    )
    }
  </>);
};
