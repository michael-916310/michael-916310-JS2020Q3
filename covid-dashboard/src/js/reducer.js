import store from './store.js';
import {
  SUMMARY_LOADED,
  IS_ABSOLUTE_CHANGED,
  IS_ALL_PERIOD_CHANGED,
  IS_ASCENDING_CHANGED,
  POPULATION_LOADED,
  COUNTRY_LIST_INDICATOR_CHANGED,
  COUNTRY_SELECTED,
} from './consts';


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
    let totalPopulation = 0;
    newState.countries.forEach((el)=>{
      const currentCountry = el.Country.toLowerCase();
      const popData = action.payload.find((item)=>{
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
  }
  return newState;
}
