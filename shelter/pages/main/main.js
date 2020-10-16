(function(){
  const menu = {

    menuBgEl: null,
    menuContainerEl: null,
    menuBtnEl: null,

    logoTitleEl: null,
    logoSubTitleEl: null,

    isHide: true,

    _showHide(el,className){
      let classList = el.classList;

      if (this.isHide) {
        if (classList.contains(className)){
          classList.remove(className);
        }
      } else {
        classList.add(className);
      }

    },

    render(){
      this._showHide(this.menuBgEl, 'burger-menu-bg__show');
      this._showHide(this.menuContainerEl, 'burger-menu-container_show');
      this._showHide(this.menuBtnEl, 'burger-menu-btn_open');

      this._showHide(this.logoTitleEl, 'header-logo__hide');
      this._showHide(this.logoSubTitleEl, 'header-logo__hide');
    },

    menuHideChange(){
      this.isHide = !this.isHide;
      this.render();
    },

    bgClick(e){
      if (!this.isHide) {

        if (!this.menuContainerEl.contains(e.target) || (!e.target.classList.contains('burger-menu-btn'))) {
          this.menuHideChange();
        }
      }
    },

    init(){

      this.menuBgEl = document.querySelector('.burger-menu-bg');
      this.menuContainerEl = document.querySelector('.burger-menu-container');
      this.menuBtnEl = document.querySelector('.burger-menu-btn');

      this.logoTitleEl = document.querySelector('.header-logo__tittle');
      this.logoSubTitleEl = document.querySelector('.header-logo__sub-tittle');

      this.render = this.render.bind(menu);
      this.menuHideChange = this.menuHideChange.bind(menu);
      this.bgClick = this.bgClick.bind(menu);

      //this.menuBgEl.addEventListener('click', this.bgClick);
      document.body.addEventListener('click', this.bgClick);
      this.menuBtnEl.addEventListener('click', this.menuHideChange);

      this.render();
    }

  }

  window.addEventListener('DOMContentLoaded', ()=>{
    menu.init();
  });

})();
