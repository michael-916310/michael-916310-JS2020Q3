(function(){
  const menu = {
    menuBtnEl: null,
    menuCover: null,

    isHide: true,

    render(){
      if (this.isHide) {
        if (this.menuCover.classList.contains('burger-menu-cover__show')){
          this.menuCover.classList.remove('burger-menu-cover__show')
        }
      } else {
        this.menuCover.classList.add('burger-menu-cover__show');
      }
    },

    menuBtnClick(){
      console.log('menu click');

      this.isHide = !this.isHide;
      this.render();
    },


    init(){
      this.menuBtnEl = document.querySelector('.burger-menu-btn');
      this.menuCover = document.querySelector('.burger-menu-cover');

      this.render = this.render.bind(menu);
      this.menuBtnClick = this.menuBtnClick.bind(menu);

      this.menuBtnEl.addEventListener('click', this.menuBtnClick);

      this.render();
    }

  }

  window.addEventListener('DOMContentLoaded', ()=>{
    //console.log('DOMContentLoaded');
    menu.init();
  });

})();
