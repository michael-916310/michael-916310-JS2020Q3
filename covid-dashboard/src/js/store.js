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
      newState.countryListIndicator = action.payload;
    } else if (action.type === COUNTRY_SELECTED) {
      newState.selectedCountry = action.payload;
    }
    return newState;
  },

  dispatch(action){
    this.state = this.reducer(action);

    // вызовем рендеры
    this.config.callBackList.forEach((el)=>{
      el.fnRender(el.fnSelector.call(this));
    });
  },

  // Далее идут селекторы
  // в них странсформируем state для рендора
  // здесь же пересчитываем все цифры
  getTotalTableData(){
    let diseased;
    let dead;
    let recovered;

    if (this.state.isAllPeriod) {
      diseased = 'TotalConfirmed';
      dead = 'TotalDeaths';
      recovered = 'TotalRecovered';
    } else {
      diseased = 'NewConfirmed';
      dead = 'NewDeaths';
      recovered = 'NewRecovered';
    }

    if (this.state.selectedCountry) {
      let arr = this.state.countries.filter((item) => {
          return (item.Country === this.state.selectedCountry);
      });
      if (arr.length === 1) {
        return {
          region: this.state.selectedCountry,
          diseased: this.recalcFromAbsolute(arr[0][diseased], arr[0].Population),
          dead: this.recalcFromAbsolute(arr[0][dead], arr[0].Population),
          recovered: this.recalcFromAbsolute(arr[0][recovered], arr[0].Population),
        };
      }
    } else {

      return {
        region: 'весь мир',
        diseased: this.recalcFromAbsolute(this.state.global[diseased], this.state.global.Population),
        dead: this.recalcFromAbsolute(this.state.global[dead], this.state.global.Population),
        recovered: this.recalcFromAbsolute(this.state.global[recovered], this.state.global.Population),
      }
    }
    // что-то пошло не так
    return {
      diseased: 0,
      dead: 0,
      recovered: 0,
    };
  },

  getUpdateDate() {
    return {
      updateDate: this.state.updateDate,
    }
  },

  getCountriesList(){
    return {
      countries: this.state.countries.map((el)=>{
        return {
          Country: el.Country,
          CountryCode: el.CountryCode,
        }
      })
    }
  },

  getRequestFieldNameForTable(){
    if (this.state.countryListIndicator === 'diseased') {
      if (this.state.isAllPeriod) {
        return 'TotalConfirmed';
      }
      return 'NewConfirmed';
    } if (this.state.countryListIndicator === 'dead') {
      if (this.state.isAllPeriod) {
        return 'TotalDeaths';
      }
      return 'NewDeaths';
    } if (this.state.countryListIndicator === 'recovered') {
      if (this.state.isAllPeriod) {
        return 'TotalRecovered';
      }
      return 'NewRecovered';
    }
    return '';
  },

  recalcFromAbsolute(data, population){
    if (this.state.isAbsolute){
      return data;
    }
    return Math.round(data*100000/population*10000)/10000;
  },

  getCountryTableDate(){
    const r = {
      countries: this.state.countries.filter((item) => {
        if (this.state.selectedCountry) {
          return (item.Country === this.state.selectedCountry);
        }
        return true;
      }).map((el)=>{
        return {
          Country: el.Country,
          CountryCode: el.CountryCode,
          data: this.recalcFromAbsolute(el[this.getRequestFieldNameForTable()], el.Population),
        }
      })
    }

    r.countries.sort((a, b) => {
      if (this.state.isAscending) {
        return a.data - b.data;
      }
      return b.data - a.data;
    })
    return r;
  }

}

export default store;