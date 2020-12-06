import store from './store';
import {
  summaryLoadedAC,
  populationLoadedAC,
  chartDataForWorldLoadedAC,
  chartDataForCountryLoadedAC,
} from './actions'
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
  store.dispatch(chartDataForWorldLoadedAC(data));
}

async function loadChartDataByQuery(query, fnAC){
  const {from} = store.getState().chart;
  const {till} = store.getState().chart;

  const url = new URL(`https://api.covid19api.com/${query}`);
  url.searchParams.append('from', dateToYYYYMMDD(from));
  url.searchParams.append('to', dateToYYYYMMDD(till));

  const data = await loadURL(url);
  store.dispatch(fnAC(data));
}

async function onLoadHandler(){
  await loadByCountries();
  await loadPopulation();
  await loadChartDataByQuery('world', chartDataForWorldLoadedAC)
}

window.addEventListener('load', ()=>{
  onLoadHandler();
})

export function loadChartData(){
  if (store.getState().selectedCountry) {
    // https://api.covid19api.com/country/afghanistan
    loadChartDataByQuery(`country/${store.getState().selectedCountry.toLocaleLowerCase()}`, chartDataForCountryLoadedAC)
  } else {
    loadChartDataForWorld();
  }
}

export function f(){}