const UPDATE_DATE_ELM = document.querySelector('.header-update-date');

export function renderUpdateDate(state){
  const dd = state.updateDate.getDate();
  const mm = state.updateDate.getMonth();
  const yyyy = state.updateDate.getFullYear();

  UPDATE_DATE_ELM.innerHTML = `Данные актуальны на: ${dd}/${mm}/${yyyy}`;
}