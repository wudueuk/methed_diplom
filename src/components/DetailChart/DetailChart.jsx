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
    let prevMonth = '';
    let amount = 0;
    const transactionDate = [];
    data.map(item => {
      const currentDate = new Date(item.date);

      if (prevMonth !== '') {
        if (currentDate.getMonth() === prevMonth) {
          amount += item.amount;
        } else {
          transactionDate.push({
            month: prevMonth,
            amount,
          });
          amount = 0;
          prevMonth = currentDate.getMonth();
        }
      } else prevMonth = currentDate.getMonth();
    });

    return transactionDate;
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
