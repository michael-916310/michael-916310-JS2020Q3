import store from './store.js';
import {
  SUMMARY_LOADED,
  IS_ABSOLUTE_CHANGED,
  IS_ALL_PERIOD_CHANGED,
  IS_ASCENDING_CHANGED,
  POPULATION_LOADED,
  COUNTRY_LIST_INDICATOR_CHANGED,
  COUNTRY_SELECTED,
  CHART_FROM_CHANGED,
  CHART_TILL_CHANGED,
  CHART_DATA_FOR_WORLD_LOADED,
} from './consts';

function PopulationReducer(newState, payload){
  let totalPopulation = 0;
  newState.countries.forEach((el)=>{
    const currentCountry = el.Country.toLowerCase();
    const popData = payload.find((item)=>{
      if (item.name.toLowerCase() === currentCountry) {
        return true;
      }
      return false;
    })
    if (popData) {
      // Добавим данные о населении
      el.Population = popData.population;
      totalPopulation += popData.population;
    }
  });
  newState.global.Population = totalPopulation;
}

// ------------------------------------------------
// Головной редюсер
// ------------------------------------------------
export default function reducer(action){
  const newState=store.getState();

  if (action.type===SUMMARY_LOADED) {

    // скачали основные данные
    newState.global = {...action.payload.Global};
    newState.countries = [...action.payload.Countries]
    newState.updateDate = new Date(action.payload.Date);

  } else if (action.type===POPULATION_LOADED) {

    // Обогатим скачанные ранее данные по странам
    // полученным сейчас населением
    PopulationReducer(newState, action.payload);

  } else if (action.type===IS_ABSOLUTE_CHANGED) {

    // меняем флаги
    newState.isAbsolute = action.payload;

  } else if (action.type===IS_ALL_PERIOD_CHANGED) {

    // меняем флаги
    newState.isAllPeriod = action.payload;

  } else if (action.type===IS_ASCENDING_CHANGED) {

    // меняем флаги
    newState.isAscending = action.payload;

  } else if (action.type === COUNTRY_LIST_INDICATOR_CHANGED) {

    // изменился показатель для отображения в таблице
    newState.countryListIndicator = action.payload;

  } else if (action.type === COUNTRY_SELECTED) {

    // выбрана другая страна
    newState.selectedCountry = action.payload;

  } else if (action.type === CHART_FROM_CHANGED) {

    // смена периода в графике
    newState.chart.from = action.payload;

  } else if (action.type === CHART_TILL_CHANGED) {

    // смена периода в графике
    newState.chart.till = action.payload;

  } else if (action.type === CHART_DATA_FOR_WORLD_LOADED) {

    // раскидаем по датам данные по миру
    worldDataReducer(newState, action.payload)

  }
  return newState;
}


function worldDataReducer(newState, payload){
  const current = new Date(newState.chart.till);

  const r = payload.reverse().map((item, index) => {
    current.setDate(current.getDate()-1);
    return {...item, ...{date: new Date(current)}};
  }).reverse();

  newState.chart.worldData = [...r];
}