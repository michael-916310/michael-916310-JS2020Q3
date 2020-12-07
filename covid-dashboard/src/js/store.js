import reducer from './reducer';

const store = {

  _state: {
    updateDate: new Date(0),
    global:{},
    countries:[],
    populationList:[],
    isAbsolute: true,
    isAllPeriod: true,
    isAscending: true,
    countryListIndicator: 'diseased',
    countryListSortOrder: 'ascending',
    selectedCountry: '',
    selectedCountrySlug: '',
    chart:{
      from: new Date('11/15/2020'),
      till: new Date(),
      worldData: [],
      countryData: [],
      countryPopulation: 0,
    }
  },

  _config: {
    renderCallBackList:[],
    autoActivity:[],
  },

  subscribe(fnRender, fnSelector){
    if (typeof(fnRender)==='function' && typeof(fnRender)==='function'){
      this._config.renderCallBackList.push({
        fnRender,
        fnSelector,
      });
    }
  },

  getState() {
    return {
      updateDate: this._state.updateDate,
      global: {...this._state.global},
      countries: [...this._state.countries],
      populationList: [...this._state.populationList],
      isAbsolute: this._state.isAbsolute,
      isAllPeriod: this._state.isAllPeriod,
      isAscending: this._state.isAscending,
      countryListIndicator: this._state.countryListIndicator,
      countryListSortOrder: this._state.countryListSortOrder,
      selectedCountry: this._state.selectedCountry,
      selectedCountrySlug: this._state.selectedCountrySlug,
      chart: {...this._state.chart},
    };
  },

  setAutoActivity(ActionsArr, fnArr){
    if (Array.isArray(ActionsArr) && Array.isArray(fnArr)) {
      // зарегистрируем автоматическое действие в ответ на
      // конкретный экшин
      this._config.autoActivity.push([ActionsArr, fnArr]);
    }
  },

  dispatch(action){
    // получим новый стейт
    this._state = reducer(action);

    // выполним автоматические действия
    // в ответ на начальный диспатч
    this._config.autoActivity.forEach((item) => {
      if (item[0].includes(action.type)) {
        item[1].forEach((el)=>{
          if (typeof(el) === 'function') {
            el();
          }
        })
      }
    });

    // вызовем рендеры, передав им данные из селекторов
    // рендеры выполняются при любом изменении сторе
    this._config.renderCallBackList.forEach((el)=>{
      el.fnRender(el.fnSelector());
    });
  },

}

export default store;