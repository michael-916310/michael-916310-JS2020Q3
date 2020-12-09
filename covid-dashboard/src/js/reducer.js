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
  CHART_DATA_FOR_COUNTRY_LOADED,
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
  newState.populationList = payload;
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
    newState.selectedCountry = action.payload.selectedCountry;
    newState.selectedCountrySlug = action.payload.slug;
    if (!action.payload.selectedCountry) {
      newState.selectedCountrySlug='';
    }
  } else if (action.type === CHART_FROM_CHANGED) {

    // смена периода в графике
    newState.chart.from = action.payload;
  } else if (action.type === CHART_TILL_CHANGED) {

    // смена периода в графике
    newState.chart.till = action.payload;
  } else if (action.type === CHART_DATA_FOR_WORLD_LOADED) {

    // раскидаем по датам данные по миру
    worldDataReducer(newState, action.payload)
  } else if (action.type === CHART_DATA_FOR_COUNTRY_LOADED) {

    countryDataReducer(newState, action.payload)
  }
  return newState;
}


function worldDataReducer(newState, payload){
  // сначала пересортируем по вызрастанию заболевших
  let r = payload.sort((a, b) => {
    return a.TotalConfirmed - b.TotalConfirmed;
  })

  // обратным отсчетом поставим дату для данных
  const current = new Date(newState.chart.till);
  r = r.reverse().map((item, index) => {
    if (index>0) {
      current.setDate(current.getDate()-1);
    }
    return {...item, ...{date: new Date(current)}};
  }).reverse();

  newState.chart.worldData = [...r];
}

function countryDataReducer(newState, payload) {
  // у США данные приходят развернутыми до городов, у других стран нет
  // оставим только сводные данные - с пустыми городами \ провинциями
  const tmpArr = payload.filter((item) => {
    if (item.Province.trim() || item.City.trim() || item.CityCode.trim()) {
      return false;
    }
    return true;
  }).map((item) => {
    return {
      date: item.Date,
      TotalDeaths: item.Deaths,
      TotalRecovered: item.Recovered,
      TotalConfirmed: item.Confirmed,
    }
  });


  // Высчитаем данные за день
  // а так же добавим население
  const currentCountry = newState.selectedCountry.toLowerCase();
  let population = 0;
  const popData = newState.populationList.find((item)=>{
    if (item.name.toLowerCase() === currentCountry) {
      return true;
    }
    return false;
  })
  if (popData) {
    population = popData.population;
  }

  newState.chart.countryPopulation = population;
  newState.chart.countryData = tmpArr.map((item, index, arr) => {
    return {
      date: item.date,
      NewDeaths: (index===0) ? 0 : item.TotalDeaths - arr[index-1].TotalDeaths,
      TotalDeaths: item.TotalDeaths,
      NewRecovered: (index===0) ? 0 : item.TotalRecovered - arr[index-1].TotalRecovered,
      TotalRecovered: item.TotalRecovered,
      NewConfirmed: (index===0) ? 0 : item.TotalConfirmed - arr[index-1].TotalConfirmed,
      TotalConfirmed: item.TotalConfirmed,
    }
  });

}

