const totalTableDiseasedEl = document.querySelector('.total-data__cell-diseased');
const totalTableDeadEl = document.querySelector('.total-data__cell-dead');
const totalTableRecoveredEl = document.querySelector('.total-data__cell-recovered');

export function renderTotalTable(state) {

  totalTableDiseasedEl.innerHTML = state.diseased;
  totalTableDeadEl.innerHTML = state.dead;
  totalTableRecoveredEl.innerHTML = state.recovered;
}