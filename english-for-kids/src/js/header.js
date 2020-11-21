import gameCore from './gameCore';

const INFO_LABEL_ELM = document.querySelector('.all-page-header__info-label');
const SWITCHER_ELM = document.querySelector('.all-page-header__switcher');
const START_ELM = document.querySelector('.all-page-header_btn-start');
const REPEAT_ELM = document.querySelector('.all-page-header_btn-repeat');
const SWITCHER_CONTAINER_ELM = document.querySelector('.all-page-header__switcher-container');


function setHeaderLabel(v){
  INFO_LABEL_ELM.innerHTML = v;
}

function renderRepeatGame(){
  if (gameCore.state.isGameRunning){
    REPEAT_ELM.style.display ='inline-block';
  } else {
    REPEAT_ELM.style.display ='none';
  }
}

function renderStartGame(){
  if (SWITCHER_ELM.checked && (!gameCore.state.isGameRunning) && (gameCore.state.currentCategoryId>=0)) {
    START_ELM.style.opacity = '1';
    START_ELM.style.display = 'inline-block'
  } else {
    START_ELM.style.opacity = '0';
  }
}

function getSwitcher(){
  return SWITCHER_ELM.checked;
}

function setSwitcher(v){
  SWITCHER_ELM.checked = v;
  renderStartGame();
}

START_ELM.addEventListener('transitionend',(e)=>{
  if (e.propertyName ==='opacity'){
    if (START_ELM.style.opacity === '0'){
      START_ELM.style.display = 'none';
    }
  }
})

function initSwitcher(fnCallback){
  SWITCHER_ELM.addEventListener('change', ()=>{
    fnCallback(getSwitcher());
  })
}

function initStartButton(fnCallback){
  START_ELM.addEventListener('click', ()=>{
    fnCallback();
  })
}

function initRepeatButton(fnCallback){
  REPEAT_ELM.addEventListener('click', ()=>{
    fnCallback();
  })
}

function renderHeader(){
  renderStartGame();
  renderRepeatGame();

  if (gameCore.state.currentCategoryId === -10) {
    SWITCHER_CONTAINER_ELM.classList.add('all-page-header__switcher-container__hide');
  } else {
    SWITCHER_CONTAINER_ELM.classList.remove('all-page-header__switcher-container__hide');
  }
}

export {setHeaderLabel, getSwitcher, setSwitcher, initSwitcher, initStartButton, initRepeatButton, renderHeader}