const UPDATE_DATE_ELM = document.querySelector('.header-update-date');

export function renderUpdateDate(state){
  const dd = state.updateDate.getDate();
  const mm = state.updateDate.getMonth()+1;
  const yyyy = state.updateDate.getFullYear();

  UPDATE_DATE_ELM.innerHTML = `Данные актуальны на: ${mm}/${dd}/${yyyy}`;
}