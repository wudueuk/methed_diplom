import style from './AccountStatistic.module.css';
import PropTypes from 'prop-types';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
/* import classNames from 'classnames'; */

export const AccountStatistic = ({value}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const balance = from => (from === value.account ? -1 : 1);

  const mathUserData = data => {
    let positive = 0;
    let negative = 0;
    data.map(item => {
      balance(item.from) > 0 ?
        positive += item.amount : negative += item.amount;
    }
    );

    return [positive, negative];
  };

  const userData = mathUserData(value.transactions);

  const data = {
    labels: ['Доходы', 'Расходы'],
    datasets: [
      {
        label: '# of Votes',
        data: userData,
        backgroundColor: [
          '#4B00CA',
          '#B865D6',

        ],
        borderColor: [
          '#4B00CA',
          '#B865D6',
        ],
        borderWidth: 1,
        cutout: '80%',
        borderRadius: 20,
        offset: 10,
      },
    ],
  };

  const options = {};

  return (
    <>
      <div className={style.doughnutLabel}>
        <p>Неделя</p>
        <p>Месяц</p>
        <p>Год</p>
      </div>
      <div className={style.doughnutElement}>
        <Doughnut options={options} data={data} />
      </div>
      <div className={style.doughnutLegend}>
        <div>
          <p>Баланс</p>
          <p className={style.doughnutLegendUp}>Доходы</p>
          <p className={style.doughnutLegendDown}>Расходы</p>
        </div>
        <div>
          <p className={style.bold}>{value.balance} ₽</p>
          <p className={style.bold}>{userData[0]} ₽</p>
          <p className={style.bold}>{userData[1]} ₽</p>
        </div>
      </div>
    </>
  );
};

AccountStatistic.propTypes = {
  value: PropTypes.object,
};
