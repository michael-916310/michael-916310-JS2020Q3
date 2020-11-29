const UPDATE_DATE_ELM = document.querySelector('.header-update-date');

export function renderUpdateDate(state){
  UPDATE_DATE_ELM.innerHTML = `Данные актуальны на: ${state.updateDate}`;
}