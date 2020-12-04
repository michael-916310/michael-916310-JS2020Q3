import reducer from './reducer';

const store = {

  _state: {
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
      from: new Date('04/15/2020'),
      till: new Date(),
      worldData: [],
    }
  },

  _config: {
    callBackList:[],
  },

  subscribe(fnRender, fnSelector){
    if (typeof(fnRender)==='function' && typeof(fnRender)==='function'){
      this._config.callBackList.push({
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
      isAbsolute: this._state.isAbsolute,
      isAllPeriod: this._state.isAllPeriod,
      isAscending: this._state.isAscending,
      countryListIndicator: this._state.countryListIndicator,
      countryListSortOrder: this._state.countryListSortOrder,
      selectedCountry: this._state.selectedCountry,
      chart: {...this._state.chart},
    };
  },

  dispatch(action){
    this._state = reducer(action);

    // вызовем рендеры
    this._config.callBackList.forEach((el)=>{
      el.fnRender(el.fnSelector());
    });
  },

}

export default store;