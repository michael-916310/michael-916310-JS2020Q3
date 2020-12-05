import Chart from 'chart.js';
import {
  dateToYYYYMMDD,
  dateToMMDDYYYY,
} from './lib.js';
import store from './store.js';
import {
  chartDateFromChangedAC,
  chartDateTillChangedAC
} from './actions';
import {loadChartData} from './loadData.js';

const CHART_REGION_ELM = document.querySelector('.chart-region-label');
const CHART_ABSOLUTE_ELM = document.querySelector('.chart-absolute-label');
const CHART_ACCUMULATE_ELM = document.querySelector('.chart-accumulate-label');
const CHART_FROM_ELM = document.querySelector('.chart-from-label');
const CHART_TILL_ELM = document.querySelector('.chart-till-label');



const ctx = document.querySelector('.chart-canvas');

const config = {
  type: 'line',
  options: {
    title: {
      display: true,
      text: 'График',
    },
  },
  data: {
    labels:['вчера', 'сегодня','завтра'],
    datasets:[{
      label: 'заболело',
      data: [10,15,12],
      borderColor: '#17a2b8',
      fill: false,
    }, {
      label: 'умерло',
      data: [1,2,3],
      borderColor: '#555',
      fill: false,
    }, {
      label: 'выздоровело',
      data: [12,12,23],
      borderColor: '#28a745',
      fill: false,
    }
  ]
  }
}
const chart = new Chart(ctx, config);

export function renderChartHeader(state){
  CHART_REGION_ELM.innerHTML = state.region;
  CHART_ABSOLUTE_ELM.innerHTML = state.absoluteDescription;
  CHART_ACCUMULATE_ELM.innerHTML= state.accumulateDescription;
  CHART_FROM_ELM.value = dateToYYYYMMDD(state.from);
  CHART_TILL_ELM.value = dateToYYYYMMDD(state.till);
}

export function renderChart(state){
  const labelsArr = state.map((item) => {
    return `${dateToMMDDYYYY(item.date)}`
  });
  const diseasedArr = state.map((item)=>{
    return item.diseased;
  });
  const deadArr = state.map((item)=>{
    return item.dead;
  });
  const recoveredArr = state.map((item)=>{
    return item.recovered;
  });

  config.data.labels = labelsArr;
  config.data.datasets[0].data = diseasedArr;
  config.data.datasets[1].data = deadArr;
  config.data.datasets[2].data = recoveredArr;
  chart.update();
}

function addEvents(){
  CHART_FROM_ELM.addEventListener('change', ()=>{
    store.dispatch(chartDateFromChangedAC(new Date(CHART_FROM_ELM.value)));
    loadChartData();
  });

  CHART_TILL_ELM.addEventListener('change', ()=>{
    store.dispatch(chartDateTillChangedAC(new Date(CHART_TILL_ELM.value)));
    loadChartData();
  })
}

addEvents();
