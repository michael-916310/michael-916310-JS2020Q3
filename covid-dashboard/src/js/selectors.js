import store from './store';

function recalcFromAbsolute(data, population){
  if (store.getState().isAbsolute){
    return data;
  }
  return Math.round(data*100000/population*10000)/10000;
}

function getRequestFieldNameForTable(){
  if (store.getState().countryListIndicator === 'diseased') {
    if (store.getState().isAllPeriod) {
      return 'TotalConfirmed';
    }
    return 'NewConfirmed';
  } if (store.getState().countryListIndicator === 'dead') {
    if (store.getState().isAllPeriod) {
      return 'TotalDeaths';
    }
    return 'NewDeaths';
  } if (store.getState().countryListIndicator === 'recovered') {
    if (store.getState().isAllPeriod) {
      return 'TotalRecovered';
    }
    return 'NewRecovered';
  }
  return '';
}

function getSearchInput(){
  return {
    selectedCountry: store.getState().selectedCountry,
  }
}

function getCountryTableDate(){
  const r = {
    countries: store.getState().countries.filter((item) => {
      if (store.getState().selectedCountry) {
        return (item.Country === store.getState().selectedCountry);
      }
      return true;
    }).map((el)=>{
      return {
        Country: el.Country,
        CountryCode: el.CountryCode,
        data: recalcFromAbsolute(el[getRequestFieldNameForTable()], el.Population),
      }
    })
  }

  r.countries.sort((a, b) => {
    if (store.getState().isAscending) {
      return a.data - b.data;
    }
    return b.data - a.data;
  })
  return r;
}

function getCountriesList(){
  return {
    countries: store.getState().countries.map((el)=>{
      return {
        Country: el.Country,
        CountryCode: el.CountryCode,
      }
    })
  }
}

function getUpdateDate() {
  return {
    updateDate: store.getState().updateDate,
  }
}

function getTotalTableData(){
  let diseased;
  let dead;
  let recovered;

  if (store.getState().isAllPeriod) {
    diseased = 'TotalConfirmed';
    dead = 'TotalDeaths';
    recovered = 'TotalRecovered';
  } else {
    diseased = 'NewConfirmed';
    dead = 'NewDeaths';
    recovered = 'NewRecovered';
  }

  if (store.getState().selectedCountry) {
    let arr = store.getState().countries.filter((item) => {
        return (item.Country === store.getState().selectedCountry);
    });
    if (arr.length === 1) {
      return {
        region: store.getState().selectedCountry,
        diseased: recalcFromAbsolute(arr[0][diseased], arr[0].Population),
        dead: recalcFromAbsolute(arr[0][dead], arr[0].Population),
        recovered: recalcFromAbsolute(arr[0][recovered], arr[0].Population),
      };
    }
  } else {

    return {
      region: 'весь мир',
      diseased: recalcFromAbsolute(store.getState().global[diseased], store.getState().global.Population),
      dead: recalcFromAbsolute(store.getState().global[dead], store.getState().global.Population),
      recovered: recalcFromAbsolute(store.getState().global[recovered], store.getState().global.Population),
    }
  }
  // что-то пошло не так
  return {
    diseased: 0,
    dead: 0,
    recovered: 0,
  };
}

export default {
  getSearchInput,
  getCountryTableDate,
  getCountriesList,
  getUpdateDate,
  getTotalTableData,
}