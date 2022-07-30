import style from './Transaction.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Transaction = ({value}) => {
  const count = () => Math.floor(Math.random(1) * Date.now());

  const deposite = (from, to) => (from === value.account ? to : from);

  const balance = (from, to) => (from === value.account ? -1 : 1);

  return (
    <div className={style.history}>
      <table className={style.table}>
        <thead>
          <tr>
            <th width='50%' className={style.tableHead}>Счет</th>
            <th width='25%' className={style.tableHead}>Сумма</th>
            <th width='25%' className={style.tableHead}>Дата</th>
          </tr>
        </thead>
        <tbody>
          {value.transactions.map(item => {
            const date = new Date(item.date);
            return (
              <tr key={count()}>
                <td className={style.tableCell}>
                  {deposite(item.from, item.to)}
                </td>
                <td className={
                  balance(item.from, item.to) > 0 ? style.tableCell :
                    classNames(style.tableCell, style.negative)
                }>
                  {item.amount * balance(item.from, item.to)}
                </td>
                <td className={style.tableCell}>{date.toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  );
};

Transaction.propTypes = {
  value: PropTypes.object,
};