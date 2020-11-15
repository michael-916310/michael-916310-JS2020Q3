import {setHeaderLabel, setSwitcher} from './header.js';
import {categoryList} from './gameData';

const gameCore = {

  state: {
    currentCategoryId: -1,
    isPlayMode: false,
  },

  renders: {
    renderMainPage: null,
    renderMenu: null,
    renderCategoryPage: null,
  },

  DOMElements: {
    mainPage: document.querySelector('.main-page__container'),
    categoryPage: document.querySelector('.category-page'),
  },


  handleCategoryChange(id){
    this.state.currentCategoryId = +id;
    this.renderMe();
  },

  renderMe(){
    // спрячем все
    this.DOMElements.mainPage.classList.add('main-page__hide');
    this.DOMElements.categoryPage.classList.add('category-page__hide');

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
        this.renders.renderCategoryPage(this.state.currentCategoryId);
        break;
      default:
        break;
    }

  },

  start(){

    setSwitcher(this.state.isPlayMode);

    this.renders.renderMenu((id)=>{
      this.handleCategoryChange(id);
    });

    this.renderMe();
  }
}

export default gameCore;