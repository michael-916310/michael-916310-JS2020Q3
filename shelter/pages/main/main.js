addBurgerMenu(
  'burger-menu-bg',
  'burger-menu-container',
  'burger-menu-btn',
  'header-logo__tittle',
  'header-logo__sub-tittle',
  'burger-menu-bg__show',
  'burger-menu-container_show',
  'burger-menu-btn_open',
  'header-logo__hide',
  'header-logo__hide'
);

(function(){
  function goToPets(){
    location.assign('../pets/pets.html');
  }

  document.querySelector('.start-screen-content__btn').addEventListener('click',goToPets);
  document.querySelector('.pets-button').addEventListener('click',goToPets);

})()


