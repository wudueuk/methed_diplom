import style from './Page404.module.css';

export const Page404 = () => (
  <>
    <h2 className={style.notfound}>Ошибка 404. Страница не существует</h2>
    <p>Запрошенная Вами страница не существует, воспользуйтесь главным
      меню.</p>
  </>
);
