import store from './store';
import {summaryLoadedAC, populationLoadedAC} from './actions'
import {dateToYYYYMMDD} from './lib';

async function loadURL(url) {
  let data;
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      data = await resp.json();
    } else {
      throw new Error(`FETCH ERROR
          url: ${resp.url}
          response status:${resp.status}
          status text:${resp.statusText}`);
    }
  } catch(e){
    console.log(e)
  }
  return data;
}

async function loadByCountries(){
  const data = await loadURL('https://api.covid19api.com/summary');
  store.dispatch(summaryLoadedAC(data));
}

async function loadPopulation(){
  const data = await loadURL('https://restcountries.eu/rest/v2/all?fields=name;population;flag');
  store.dispatch(populationLoadedAC(data));

}

async function loadChartDataForWorld(){
  const {from} = store.getState().chart;
  const {till} = store.getState().chart;

  const url = new URL('https://api.covid19api.com/world');
  url.searchParams.append('from', dateToYYYYMMDD(from));
  url.searchParams.append('to', dateToYYYYMMDD(till));

  const data = await loadURL(url);
  console.log(data);
}

async function onLoadHandler(){
  await loadByCountries();
  await loadPopulation();
  await loadChartDataForWorld();
}

window.addEventListener('load', ()=>{
  onLoadHandler();
})