import {setHeaderLabel, setSwitcher, initSwitcher, initStartButton, initRepeatButton, renderHeader} from './header.js';
import {categoryList, categoryData} from './gameData';
import {getRandomItems} from './lib.js';


const gameCore = {

  state: {
    currentCategoryId: -1,
    isPlayMode: false,
    isGameRunning: false,

    currentGame:{
      itemsOrderToCheck:[],
      currentItemIndex:0,
      answers:[],
    },
  },

  renders: {
    renderMainPage: null,
    renderMenu: null,
    renderCategoryPage: null,
    renderGameProcess: null,
  },

  DOMElements: {
    mainPage: document.querySelector('.main-page__container'),
    categoryPage: document.querySelector('.category-page'),
    gameProcess: document.querySelector('.game-process-container'),
  },


  handleCategoryChange(id){
    this.state.currentCategoryId = +id;
    this.stopGame();
    this.renderMe();
  },

  renderMe(){
    // спрячем все
    this.DOMElements.mainPage.classList.add('main-page__hide');
    this.DOMElements.categoryPage.classList.add('category-page__hide');
    this.DOMElements.gameProcess.classList.add('game-process-container__hide');

    let lblArr = categoryList.filter((el)=>{
      if (el.id===this.state.currentCategoryId) {
        return true;
      }
      return false;
    })

    switch (this.state.currentCategoryId) {
      case -1 :
        setHeaderLabel('select category to');
        this.DOMElements.mainPage.classList.remove('main-page__hide');
        // передадим колбэк на клик по карточке категории
        this.renders.renderMainPage((id)=>{
          this.handleCategoryChange(id);
        });
        break;
      case 1 :
      case 2 :
      case 3 :
      case 4 :
      case 5 :
      case 6 :
      case 7 :
      case 8 :
        if (lblArr) {
          setHeaderLabel(lblArr[0].itemName);
        }

        this.DOMElements.categoryPage.classList.remove('category-page__hide');
        this.DOMElements.gameProcess.classList.remove('game-process-container__hide');

        this.renders.renderCategoryPage(this.state.currentCategoryId);
        this.renders.renderGameProcess();

        break;
      default:
        break;
    }


  },

  stopGame(){
    this.state.isGameRunning = false;
    this.state.currentGame.currentItemIndex = 0;
    this.state.currentGame.answers=[];
    renderHeader();
  },

  gameFinished(){
    console.log("FINISH");
  },

  addAnswer(isOk, itemIndex){
    if (isOk) {
      if (this.state.currentGame.currentItemIndex<(this.state.currentGame.itemsOrderToCheck.length-1)){
        this.state.currentGame.currentItemIndex++;
        this.playSound(1000);
      } else {
        this.stopGame();
        this.gameFinished();
      }
    }
    this.state.currentGame.answers.push({isOk, itemIndex});
    this.renders.renderGameProcess();
  },

  playSound(delay=0){
    let idx = this.state.currentGame.itemsOrderToCheck[this.state.currentGame.currentItemIndex];

    function cb(){
      const a = new Audio();
      const arr = categoryData.get(gameCore.state.currentCategoryId);

      a.src = arr[idx].audioSrc;
      a.autoplay = true;

    }
    // задержка нужна чтобы не смешивались звуки "успеха\ошибки" и следующего слова
    setTimeout(cb, delay);
  },

  startGame(){
    this.state.isGameRunning = true;
    renderHeader();

    this.state.currentGame.itemsOrderToCheck = getRandomItems(this.state.currentCategoryId);
    this.state.currentGame.currentItemIndex = 0;
    this.state.currentGame.answers=[];

    this.playSound();
  },

  start(){

    setSwitcher(this.state.isPlayMode);
    initSwitcher((v)=>{
      this.state.isPlayMode = v;
      if (!this.state.isPlayMode ) {
        this.stopGame()
      }
      this.renderMe();
      renderHeader();
    });

    initStartButton(()=>{
      this.startGame()
    });

    initRepeatButton(()=>{ this.playSound() })

    this.renders.renderMenu((id)=>{
      this.handleCategoryChange(id);
    });

    this.renderMe();
  }
}

export default gameCore;