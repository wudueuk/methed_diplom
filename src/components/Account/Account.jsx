import style from './Account.module.css';

export const Account = () => (
  <div className={style.account}>
    <span className={style.number}>449488503980</span>
    <span className={style.balance}>530 080 ₽</span>
    <div className={style.info}>
      <span>Открыт</span>
      <span>последняя операция</span>
      <span>10.03.2020</span>
      <span>24.07.2022</span>
    </div>
  </div>
);
