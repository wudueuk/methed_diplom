import style from './TransactionHistory.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TransactionHistory = ({value}) => {
  let count = 0;
  const transactions = value.transactions.reverse();
  const deposite = (from, to) => (from === value.account ? to : from);

  const balance = from => (from === value.account ? -1 : 1);

  return (
    <table key={Math.floor(Math.random(1) * Date.now())}
      className={style.table}>
      <thead key={Math.floor(Math.random(1) * Date.now())}>
        <tr key={Math.floor(Math.random(1) * Date.now())}>
          <th width='50%' className={style.tableHead}>Счет</th>
          <th width='25%' className={style.tableHead}>Сумма</th>
          <th width='25%' className={style.tableHead}>Дата</th>
        </tr>
      </thead>
      <tbody key={Math.floor(Math.random(1) * Date.now())}>
        {transactions.map(item => {
          const date = new Date(item.date);
          count++;
          return (<>
            {
              count <= 9 ? (
                <tr key={count}>
                  <td className={style.tableCell}>
                    {deposite(item.from, item.to)}
                  </td>
                  <td className={
                    balance(item.from) > 0 ? style.tableCell :
                      classNames(style.tableCell, style.negative)
                  }>
                    {item.amount * balance(item.from, item.to)}
                  </td>
                  <td className={style.tableCell}>
                    {date.toLocaleDateString()}</td>
                </tr>
              ) : null
            }
          </>);
        })
        }
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  value: PropTypes.object,
};
