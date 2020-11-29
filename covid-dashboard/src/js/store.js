import {SUMMARY_LOADED, IS_ABSOLUTE_CHANGED, IS_ALL_PERIOD_CHANGED, IS_ASCENDING_CHANGED} from './consts';

const store = {

  state: {
    updateDate: new Date(0),
    global:{},
    countries:[],
    isAbsolute: true,
    isAllPeriod: true,
    isAscending: true,
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
    };
  },

  reducer(action){
    const newState=this.getState();

    if (action.type===SUMMARY_LOADED) {
      newState.global = {...action.payload.Global};
      newState.countries = [...action.payload.Countries]
    } else if (action.type===IS_ABSOLUTE_CHANGED) {
      newState.isAbsolute = action.payload;
    } else if (action.type===IS_ALL_PERIOD_CHANGED) {
      newState.isAllPeriod = action.payload;
    } else if (action.type===IS_ASCENDING_CHANGED) {
      newState.isAscending = action.payload;
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

  getTotalTableData(){
    let diseased;
    let dead;
    let recovered;
    if (this.state.isAllPeriod) {
      diseased = this.state.global.TotalConfirmed;
      dead = this.state.global.TotalDeaths;
      recovered = this.state.global.TotalRecovered;
    } else {
      diseased = this.state.global.NewConfirmed;
      dead = this.state.global.NewDeaths;
      recovered = this.state.global.NewRecovered;
    }
    if (!this.state.isAbsolute){
      diseased = diseased/100000;
      dead = dead/100000;
      recovered = recovered /100000;
    }
    return {
      diseased,
      dead,
      recovered,
    };
  },

  getUpdateDate() {
    return {
      updateDate: this.state.updateDate,
    }
  }

}

export default store;