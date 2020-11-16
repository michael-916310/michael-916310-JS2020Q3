const INFO_LABEL_ELM = document.querySelector('.all-page-header__info-label');
const SWITCHER_ELM = document.querySelector('.all-page-header__switcher');
const START_ELM = document.querySelector('.all-page-header_btn-start');
const REPEAT_ELM = document.querySelector('.all-page-header_btn-repeat');

import gameCore from './gameCore';

function setHeaderLabel(v){
  INFO_LABEL_ELM.innerHTML = v;
}

function getSwitcher(){
  return SWITCHER_ELM.checked;
}

function setSwitcher(v){
  SWITCHER_ELM.checked = v;
  renderStartGame();
}

function renderRepeatGame(){
  if (gameCore.state.isGameRunning){
    REPEAT_ELM.style.display ='inline-block';
  } else {
    REPEAT_ELM.style.display ='none';
  }
}

function renderStartGame(){
  if (SWITCHER_ELM.checked && (!gameCore.state.isGameRunning) && (gameCore.state.currentCategoryId!=-1)) {
    START_ELM.style.opacity = '1';
    START_ELM.style.display = 'inline-block'
  } else {
    START_ELM.style.opacity = '0';
  }
}

START_ELM.addEventListener('transitionend',(e)=>{
  if (e.propertyName ==='opacity'){
    if (START_ELM.style.opacity == '0'){
      START_ELM.style.display = 'none';
    }
  }
})

function initSwitcher(fnCallback){
  SWITCHER_ELM.addEventListener('change', ()=>{
    fnCallback(getSwitcher());
    renderStartGame();
    renderRepeatGame();
  })
}

function initStartButton(fnCallback){
  START_ELM.addEventListener('click', ()=>{
    fnCallback();
    renderStartGame();
    renderRepeatGame();
  })
}

function renderHeader(){
  renderStartGame();
  renderRepeatGame();
}

export {setHeaderLabel, getSwitcher, setSwitcher, initSwitcher, initStartButton, renderHeader}