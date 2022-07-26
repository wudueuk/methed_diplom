import style from './Login.module.css';
import Button from '../../components/Button';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useToken} from '../../hooks/useToken';

export const Login = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userPasswd, setUserPasswd] = useState('');
  const [formTitle, setFormTitle] = useState('Вход в аккаунт');
  const [formTitleStyle, setFormTitleStyle] = useState(style.title);

  const handleUserChange = (e) => {
    const target = e.target;
    setUserName(target.value);
    setFormTitle('Вход в аккаунт');
    setFormTitleStyle(style.title);
  };

  const handlePasswdChange = (e) => {
    const target = e.target;
    setUserPasswd(target.value);
    setFormTitle('Вход в аккаунт');
    setFormTitleStyle(style.title);
  };

  const handleSubmit = () => {
    if (/^[A-Za-z]\w{5,}/.test(userName) &&
      /\w{6,}/.test(userPasswd)) {
      navigate('/auth',
        {
          state:
          {
            user: userName,
            passwd: userPasswd,
          }
        });
    } else {
      setFormTitle('Ошибка ввода логина или пароля');
      setFormTitleStyle(style.titleError);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (<>
    {!token ? (
      <div className={style.body}>
        <h2 className={formTitleStyle}>{formTitle}</h2>
        <div className={style.group}>
          <label className={style.label}>Логин</label>
          <input className={style.input} name='login' type='text'
            value={userName} onChange={handleUserChange}
            tabIndex={1} />
        </div>
        <div className={style.group}>
          <label className={style.label}>Пароль</label>
          <input className={style.input} name='passwd' type='password'
            value={userPasswd} onChange={handlePasswdChange}
            tabIndex={2} onKeyDown={handleKeyDown} />
        </div>
        <div className={style.buttonBox} onClick={handleSubmit}
          onKeyDown={handleKeyDown} tabIndex={3}>
          <Button value='Войти' styles={style.button} />
        </div>
      </div>
    ) : ''
    }
  </>);
};
