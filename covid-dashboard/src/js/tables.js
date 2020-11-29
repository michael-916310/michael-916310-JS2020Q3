const TOTAL_TABLE_DISEASED_ELM = document.querySelector('.total-data__cell-diseased');
const TOTAL_TABLE_DEAD_ELM  = document.querySelector('.total-data__cell-dead');
const TOTAL_TABLE_RECOVERED_ELM = document.querySelector('.total-data__cell-recovered');
const COUNTRIES_DATALIST_ELM = document.querySelector('#countries-datalist');
const COUNTRY_SEARCH_INPUT_ELM = document.querySelector('.country-search__input');

const optionsList=new Set();

export function renderTotalTable(state) {

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

function init(){
  let inputOK = false;

  COUNTRY_SEARCH_INPUT_ELM.addEventListener('change',()=>{
    inputOK=false;

    if ( optionsList.has(COUNTRY_SEARCH_INPUT_ELM.value) || (COUNTRY_SEARCH_INPUT_ELM.value.trim()==='')) {
      inputOK=true;
    }
  });

  COUNTRY_SEARCH_INPUT_ELM.addEventListener('blur',()=>{
    if (!inputOK) {
      COUNTRY_SEARCH_INPUT_ELM.focus();
    }
  });

}

init();
