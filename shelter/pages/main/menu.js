function addBurgerMenu (
    cls_burger_menu_bg,
    cls_burger_menu_container,
    cls_burger_menu_btn,
    cls_header_logo__tittle,
    cls_header_logo__sub_tittle,
    cls_burger_menu_bg__show,
    cls_burger_menu_container_show,
    cls_burger_menu_btn_open,
    cls_header_logo__hide,
    cls_header_logo__hide
  ){
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
      this._showHide(this.menuBgEl, cls_burger_menu_bg__show);
      this._showHide(this.menuContainerEl, cls_burger_menu_container_show);
      this._showHide(this.menuBtnEl, cls_burger_menu_btn_open);

      this._showHide(this.logoTitleEl, cls_header_logo__hide);
      this._showHide(this.logoSubTitleEl, cls_header_logo__hide);
    },

    menuHideChange(){
      this.isHide = !this.isHide;
      this.render();
    },

    bodyClick(e){
      if (!this.isHide) {
        if (!this.menuContainerEl.contains(e.target)) {
          if (!e.target.classList.contains(cls_burger_menu_btn)) {
            this.menuHideChange();
          }
        } else {
          // закроем меню если нажата текущая страница
          if (e.target.classList.contains('burger-menu__item_selected')) {
            this.menuHideChange();
          }
        }
      }
    },

    init(){

      this.menuBgEl = document.querySelector(`.${cls_burger_menu_bg}`);
      this.menuContainerEl = document.querySelector(`.${cls_burger_menu_container}`);
      this.menuBtnEl = document.querySelector(`.${cls_burger_menu_btn}`);

      this.logoTitleEl = document.querySelector(`.${cls_header_logo__tittle}`);
      this.logoSubTitleEl = document.querySelector(`.${cls_header_logo__sub_tittle}`);

      this.render = this.render.bind(menu);
      this.menuHideChange = this.menuHideChange.bind(menu);
      this.bodyClick = this.bodyClick.bind(menu);

      document.body.addEventListener('click', this.bodyClick);
      this.menuBtnEl.addEventListener('click', this.menuHideChange);

      this.render();
    }

  }

  window.addEventListener('DOMContentLoaded', ()=>{
    menu.init();
  });
}

