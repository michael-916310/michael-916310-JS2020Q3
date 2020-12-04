import store from './store';

function recalcFromAbsolute(data, population){
  if (store.state.isAbsolute){
    return data;
  }
  return Math.round(data*100000/population*10000)/10000;
}

function getRequestFieldNameForTable(){
  if (store.state.countryListIndicator === 'diseased') {
    if (store.state.isAllPeriod) {
      return 'TotalConfirmed';
    }
    return 'NewConfirmed';
  } if (store.state.countryListIndicator === 'dead') {
    if (store.state.isAllPeriod) {
      return 'TotalDeaths';
    }
    return 'NewDeaths';
  } if (store.state.countryListIndicator === 'recovered') {
    if (store.state.isAllPeriod) {
      return 'TotalRecovered';
    }
    return 'NewRecovered';
  }
  return '';
}

function getSearchInput(){
  return {
    selectedCountry: store.state.selectedCountry,
  }
}

function getCountryTableDate(){
  const r = {
    countries: store.state.countries.filter((item) => {
      if (store.state.selectedCountry) {
        return (item.Country === store.state.selectedCountry);
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
    if (store.state.isAscending) {
      return a.data - b.data;
    }
    return b.data - a.data;
  })
  return r;
}

function getCountriesList(){
  return {
    countries: store.state.countries.map((el)=>{
      return {
        Country: el.Country,
        CountryCode: el.CountryCode,
      }
    })
  }
}

function getUpdateDate() {
  return {
    updateDate: store.state.updateDate,
  }
}

function getTotalTableData(){
  let diseased;
  let dead;
  let recovered;

  if (store.state.isAllPeriod) {
    diseased = 'TotalConfirmed';
    dead = 'TotalDeaths';
    recovered = 'TotalRecovered';
  } else {
    diseased = 'NewConfirmed';
    dead = 'NewDeaths';
    recovered = 'NewRecovered';
  }

  if (store.state.selectedCountry) {
    let arr = store.state.countries.filter((item) => {
        return (item.Country === store.state.selectedCountry);
    });
    if (arr.length === 1) {
      return {
        region: store.state.selectedCountry,
        diseased: recalcFromAbsolute(arr[0][diseased], arr[0].Population),
        dead: recalcFromAbsolute(arr[0][dead], arr[0].Population),
        recovered: recalcFromAbsolute(arr[0][recovered], arr[0].Population),
      };
    }
  } else {

    return {
      region: 'весь мир',
      diseased: recalcFromAbsolute(store.state.global[diseased], store.state.global.Population),
      dead: recalcFromAbsolute(store.state.global[dead], store.state.global.Population),
      recovered: recalcFromAbsolute(store.state.global[recovered], store.state.global.Population),
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