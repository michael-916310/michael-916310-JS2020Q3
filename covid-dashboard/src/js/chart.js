import Chart from 'chart.js';
import {dateToYYYYMMDD} from './lib.js';
import store from './store.js';
import {
  chartDateFromChangedAC,
  chartDateTillChangedAC}
from './actions';
import {loadChartData} from './loadData.js';

const CHART_REGION_ELM = document.querySelector('.chart-region-label');
const CHART_ABSOLUTE_ELM = document.querySelector('.chart-absolute-label');
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
chart.update();

export function renderChartHeader(state){
  CHART_REGION_ELM.innerHTML = state.region;
  CHART_ABSOLUTE_ELM.innerHTML = state.absoluteDescription;
  CHART_FROM_ELM.value = dateToYYYYMMDD(state.from);
  CHART_TILL_ELM.value = dateToYYYYMMDD(state.till);
}

export function f(){

}

function addEvents(){
  CHART_FROM_ELM.addEventListener('change', ()=>{
    store.dispatch(chartDateFromChangedAC(new Date(CHART_FROM_ELM.value)));
    loadChartData();
  });

  CHART_TILL_ELM.addEventListener('change', ()=>{
    store.dispatch(chartDateTillChangedAC(new Date(CHART_TILL_ELM.value)));
    loadChartData();
    console.log(store.getState().chart);
  })
}

addEvents();
