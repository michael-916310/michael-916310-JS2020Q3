import store from './store';
import {summaryLoadedAC} from './actions'

async function loadData(url) {
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
  const data = await loadData('https://api.covid19api.com/summary');
  store.dispatch(summaryLoadedAC(data));
}

window.addEventListener('load', ()=>{
  loadByCountries();
})