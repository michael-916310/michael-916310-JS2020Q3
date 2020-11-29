import {
  SUMMARY_LOADED,
  IS_ABSOLUTE_CHANGED,
  IS_ALL_PERIOD_CHANGED,
  IS_ASCENDING_CHANGED,
  POPULATION_LOADED,
} from './consts';

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
      console.log(newState);
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
      diseased = Math.round(diseased*100000/this.state.global.Population*10000)/10000;
      dead = Math.round(dead*100000/this.state.global.Population*10000)/10000;
      recovered = Math.round(recovered*100000/this.state.global.Population*10000)/10000;
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