import Chart from 'chart.js';

const ctx = document.querySelector('.chart-canvas');

const config = {
  type: 'line',
  options: {
    title: {
      display: true,
      text: 'title',
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  },
  data: {
    labels:['вчера', 'сегодня','завтра'],
    datasets:[{
      label: 'заболело',
      data: [10,15,12],
      borderColor: '#28a745',
      fill: false,
    }, {
      label: 'умерло',
      data: [1,2,3],
      fill: false,
    }, {
      label: 'выздоровело',
      data: [12,12,23],
      fill: false,
    }
  ]
  }
}

const chart = new Chart(ctx, config);

