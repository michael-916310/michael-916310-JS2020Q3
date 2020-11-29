import {SUMMARY_LOADED} from './consts'

const store = {

  state: {
    global:{},
    countries:[],
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
      global: {...this.state.global},
      countries: [...this.state.countries],
    };
  },

  reducer(action){
    const newState=this.getState();

    if (action.type===SUMMARY_LOADED) {
      newState.global = {...action.payload.Global};
      newState.countries = [...action.payload.Countries]
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
    return {
      diseased: this.state.global.TotalConfirmed,
      dead: this.state.global.TotalDeaths,
      recovered: this.state.global.TotalRecovered,
    };
  }

}

export default store;