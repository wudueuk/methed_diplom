import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {chartLabels} from '../../api/const';
import {Line} from 'react-chartjs-2';

export const DetailChart = ({value}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        color: '#FFF',
        labels: {
          color: '#FFF',
          font: {
            size: 12,
          },
        },
        title: {
          color: '#FFF',
        },
      },
      title: {
        display: true,
        align: 'start',
        font: {
          family: 'Nunito',
          size: '20px',
          weight: '600',
        },
        text: 'Динамика',
        color: '#FFF',
        padding: {
          bottom: '20',
        },
      },
      tooltip: {
        backgroundColor: '#210B36',
        bodyFontColor: '#fff',
        footerFontColor: '#fff',
        titleFontColor: '#fff',
        titleFontStyle: 'bold',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
      }
    },
  };

  const mathAmount = data => {
    const startTime = Date.now() - 1000 * 3600 * 24 * 180;
    const startMonth = new Date(startTime).getMonth();
    const startYear = new Date(startTime).getFullYear();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date(startTime).getFullYear();
    let prevMonth = '';
    let prevYear = '';
    let amount = 0;
    const transaction = [];
    data.map(item => {
      const currentMonth = new Date(item.date).getMonth();
      const currentYear = new Date(item.date).getFullYear();

      if (prevMonth !== '' && prevYear !== '') {
        if ((currentYear === startYear && currentMonth > startMonth) ||
          (currentYear === todayYear && currentMonth <= todayMonth)) {
          if (currentMonth === prevMonth) {
            amount += item.amount;
          } else {
            amount += item.amount;
            transaction.push({
              month: prevMonth,
              amount,
            });
            amount = 0;
            prevMonth = currentMonth;
            prevYear = currentYear;
          }
        }
      } else {
        if ((currentYear === startYear && currentMonth > startMonth) ||
          (currentYear === todayYear && currentMonth <= todayMonth)) {
          prevMonth = currentMonth;
          prevYear = currentYear;
          amount += item.amount;
        }
      }
    });

    const returnData = transaction.sort((a, b) => {
      if (a.month < b.month) {
        return -1;
      }
      if (a.month > b.month) {
        return 1;
      }
      return 0;
    });
    console.log(returnData);

    return returnData;
  };

  const userData = mathAmount(value.transactions);

  const chartData = {
    color: '#FFF',
    labels: userData.map(item => chartLabels[item.month]),
    datasets: [
      {
        label: '',
        data: userData.map(item => item.amount),
        color: '#FFF',
        borderColor: '#B865D6',
        backgroundColor: '#B865D6',
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

DetailChart.propTypes = {
  value: PropTypes.object,
};
