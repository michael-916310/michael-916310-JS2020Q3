const INFO_LABEL_ELM = document.querySelector('.all-page-header__info-label');
const SWITCHER_ELM = document.querySelector('.all-page-header__switcher');

function setHeaderLabel(v){
  INFO_LABEL_ELM.innerHTML = v;
}

function getSwitcher(){
  return SWITCHER_ELM.checked;
}

function setSwitcher(v){
  SWITCHER_ELM.checked = v;
}

function initSwitcher(fnCallback){
  SWITCHER_ELM.addEventListener('change', ()=>{
    fnCallback(getSwitcher())
  })
}

export {setHeaderLabel, getSwitcher, setSwitcher, initSwitcher}