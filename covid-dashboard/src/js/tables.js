const totalTableDiseasedEl = document.querySelector('.total-data__cell-diseased');
const totalTableDeadEl = document.querySelector('.total-data__cell-dead');
const totalTableRecoveredEl = document.querySelector('.total-data__cell-recovered');
const COUNTRIES_DATALIST_ELM = document.querySelector('#countries-datalist');

export function renderTotalTable(state) {

  totalTableDiseasedEl.innerHTML = state.diseased;
  totalTableDeadEl.innerHTML = state.dead;
  totalTableRecoveredEl.innerHTML = state.recovered;
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
    fr.append(op);
  });
  COUNTRIES_DATALIST_ELM.append(fr);

}