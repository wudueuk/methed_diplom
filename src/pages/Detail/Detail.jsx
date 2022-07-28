import style from './Detail.module.css';
import Button from '../../components/Button';

export const Detail = () => (
  <div className={style.detail}>
    <div className={style.titleBox}>
      <h2 className={style.title}>Счет № 00000000</h2>
      <Button value='Вернуться' styles={style.back} />
    </div>

    <div className={style.detailInner}></div>

    <h3 className={style.transitionTitle}>Перевод</h3>
    <div className={style.transition}>
      <div className={style.group}>
        <label className={style.label}>Счет</label>
        <input className={style.input}></input>
      </div>
      <div className={style.group}>
        <label className={style.label}>Сумма</label>
        <input className={style.input}></input>
      </div>
      <div className={style.group}>
        <Button value='Перевести' styles={style.submit} />
      </div>
    </div>
  </div>
);
