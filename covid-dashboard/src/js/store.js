import {
  SUMMARY_LOADED,
  IS_ABSOLUTE_CHANGED,
  IS_ALL_PERIOD_CHANGED,
  IS_ASCENDING_CHANGED,
  POPULATION_LOADED,
  COUNTRY_LIST_INDICATOR_CHANGED,
  COUNTRY_SELECTED,
} from './consts';

const store = {

  state: {
    updateDate: new Date(0),
    global:{},
    countries:[],
    isAbsolute: true,
    isAllPeriod: true,
    isAscending: true,
    countryListIndicator: 'diseased',
    countryListSortOrder: 'ascending',
    selectedCountry: '',
    chart:{
      from: new Date('01/01/2020'),
      till: new Date(),
    }
  },

  config: {
    callBackList:[],
  },

  subscribe(fnRender, fnSelector){
    if (typeof(fnRender)==='function' && typeof(fnRender)==='function'){
      this.config.callBackList.push({
        fnRender,
        fnSelector,
      });
    }
  },

  getState() {
    return {
      updateDate: this.state.updateDate,
      global: {...this.state.global},
      countries: [...this.state.countries],
      isAbsolute: this.state.isAbsolute,
      isAllPeriod: this.state.isAllPeriod,
      isAscending: this.state.isAscending,
      countryListIndicator: this.state.countryListIndicator,
      countryListSortOrder: this.state.countryListSortOrder,
      selectedCountry: this.state.selectedCountry,
      chart: {...this.state.chart},
    };
  },

  reducer(action){
    const newState=this.getState();

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
  },

  dispatch(action){
    this.state = this.reducer(action);

    // вызовем рендеры
    this.config.callBackList.forEach((el)=>{
      el.fnRender(el.fnSelector());
    });
  },

}

export default store;