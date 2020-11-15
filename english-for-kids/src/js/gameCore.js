
const gameCore = {

  state: {
    currentPageId: -1,
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
    this.state.currentPageId = +id;
    this.renderMe();
  },

  renderMe(){
    // спрячем все
    this.DOMElements.mainPage.classList.add('main-page__hide');
    this.DOMElements.categoryPage.classList.add('category-page__hide');

    switch (this.state.currentPageId) {
      case -1 :
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
        this.DOMElements.categoryPage.classList.remove('category-page__hide');
        this.renders.renderCategoryPage(this.state.currentPageId);
        break;
      default:
        break;
    }

  },

  start(){

    this.renders.renderMenu((id)=>{
      this.handleCategoryChange(id);
    });

    this.renderMe();
  }
}

export default gameCore;