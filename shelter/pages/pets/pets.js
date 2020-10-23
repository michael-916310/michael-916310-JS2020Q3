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
  'header-logo__hide',
  isPets = true
);


(function(){
  let sliderItems = document.querySelectorAll(`.slider-item`);
  let items = []; // массив элементов



  // добавим открытие попапов
  function openPopup(){
    let bg = document.querySelector('.pets-popup-bg');

    // items.forEach((item)=>{
    //   if (item.element == this.parentNode) {
    //     let dt = petsDataArray[item.petsArrIndex];
    //     bg.querySelector('.pets-popup__name').innerHTML = dt.name;
    //     bg.querySelector('.pets-popup__title').innerHTML = `${dt.type} - ${dt.breed}`;
    //     bg.querySelector('.pets-popup__info').innerHTML = dt.description;
    //     bg.querySelector('.pets-popup__img').src = dt.img;

    //     bg.querySelectorAll('.pets-popup__list-item-data')[0].innerHTML = dt.age;
    //     bg.querySelectorAll('.pets-popup__list-item-data')[1].innerHTML = dt.inoculations;
    //     bg.querySelectorAll('.pets-popup__list-item-data')[2].innerHTML = dt.diseases;
    //     bg.querySelectorAll('.pets-popup__list-item-data')[3].innerHTML = dt.parasites;

    //     bg.classList.add('pets-popup-bg-visible');
    //   }
    // });

  }

  function closePopup(){
    document.querySelector('.pets-popup-bg').classList.remove('pets-popup-bg-visible');
  }
  function bgClick(e){
    if (!document.querySelector('.pest-popup').contains(e.target)) {
      closePopup();
    }
  }

  document.querySelectorAll('.pets-slider__card').forEach((el)=>{
    el.addEventListener('click', openPopup);
  });

  document.querySelector('.pets-popup__close-btn').addEventListener('click', closePopup);
  document.querySelector('.pets-popup-bg').addEventListener('click', bgClick);


})();