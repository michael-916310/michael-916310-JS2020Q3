import store from './store';
import {
  countryListIndicatorChangedAC,
  countrySelectedAC,
}
from './actions';

const TOTAL_TABLE_DISEASED_ELM = document.querySelector('.total-data__cell-diseased');
const TOTAL_TABLE_DEAD_ELM  = document.querySelector('.total-data__cell-dead');
const TOTAL_TABLE_RECOVERED_ELM = document.querySelector('.total-data__cell-recovered');
const COUNTRIES_DATALIST_ELM = document.querySelector('#countries-datalist');
const COUNTRY_SEARCH_INPUT_ELM = document.querySelector('.country-search__input');
const COUNTRY_LIST_INDICATOR_ELM = document.querySelector('.country-list__indicator');
const COUNTRY_LIST_TABLE_ELM = document.querySelector('.country-list__table');
const TOTAL_TABLE_REGION_ELM = document.querySelector('.total-data__cell-region');

const optionsList=new Set();

// ------------------------------------------------------
// рендер-функции
// вызываются при обновлении store
// ------------------------------------------------------
export function renderTotalTable(state) {

  TOTAL_TABLE_REGION_ELM.innerHTML = state.region;
  TOTAL_TABLE_DISEASED_ELM.innerHTML = state.diseased;
  TOTAL_TABLE_DEAD_ELM.innerHTML = state.dead;
  TOTAL_TABLE_RECOVERED_ELM.innerHTML = state.recovered;
}

export function renderCountryList(state){
  while (COUNTRIES_DATALIST_ELM.firstChild) {
    COUNTRIES_DATALIST_ELM.firstChild.remove();
  }

  const fr = document.createDocumentFragment()
  state.countries.forEach((el)=>{
    const op = document.createElement("option");
    op.value=el.Country;
    op.innerText = el.CountryCode;
    optionsList.add(op.value);
    fr.append(op);
  });
  COUNTRIES_DATALIST_ELM.append(fr);
}

export function renderCountryTable(state){
  while (COUNTRY_LIST_TABLE_ELM.firstChild) {
    COUNTRY_LIST_TABLE_ELM.firstChild.remove();
  }

  const fr = document.createDocumentFragment();
  state.countries.forEach((item) => {
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(`afterbegin`,`
      <td class="country-list__row__cell">
        <img src="https://www.countryflags.io/${item.CountryCode}/flat/16.png"/>
      </td>
      <td class="country-list__row__cell country-list__row-cell-country">${item.Country}</td>
      <td class="country-list__row__cell">${item.data}</td>
    `);
    fr.append(tr);
  });
  COUNTRY_LIST_TABLE_ELM.append(fr);
}

function addEvents(){
  let inputOK = false;

  COUNTRY_SEARCH_INPUT_ELM.addEventListener('change',()=>{
    inputOK=false;

    if ( optionsList.has(COUNTRY_SEARCH_INPUT_ELM.value) || (COUNTRY_SEARCH_INPUT_ELM.value.trim()==='')) {
      inputOK=true;
      store.dispatch(countrySelectedAC(COUNTRY_SEARCH_INPUT_ELM.value.trim()));
    }
  });

  COUNTRY_SEARCH_INPUT_ELM.addEventListener('blur',()=>{
    if (!inputOK) {
      COUNTRY_SEARCH_INPUT_ELM.focus();
    }
  });

  COUNTRY_LIST_INDICATOR_ELM.addEventListener('change', ()=>{
    store.dispatch(countryListIndicatorChangedAC(COUNTRY_LIST_INDICATOR_ELM.value));
  });

}

addEvents();
