import store from './store.js';
import {switcherChangedAC} from './actions';


function initSwitcher(switcherClassName, trueLabel, falseLabel, switcherName){
  let selected = true;
  const elm = document.querySelector(`.${switcherClassName}`);

  function renderMe(){
    if (selected) {
      elm.classList.add('switcher_selected');
      elm.classList.add(`${switcherClassName}_selected`);
      elm.innerHTML=trueLabel;
    } else {
      elm.classList.remove('switcher_selected');
      elm.classList.remove(`${switcherClassName}_selected`);
      elm.innerHTML=falseLabel;
    };
  }

  elm.addEventListener('click', ()=>{
    selected = !selected;
    store.dispatch(switcherChangedAC(switcherName, selected));
    renderMe();
  });

  renderMe();
}

initSwitcher('header-controls__switcher-is-absolute', 'в абсолютных числах', 'в пересчете на 100 тысяч', 'isAbsolute');
initSwitcher('header-controls__switcher-is-all-period', 'за весь период', 'данные за день', 'isAllPeriod');
initSwitcher('country-list__is-ascending', 'по возрастанию', 'по убыванию', 'isAscending');

