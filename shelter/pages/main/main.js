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

// ---------------------------------------------------------
// добавим переход на страницу питомцев по кнопкам
// ---------------------------------------------------------
(function(){
  function goToPets(){
    location.assign('../pets/pets.html');
  }

  document.querySelector('.start-screen-content__btn').addEventListener('click',goToPets);
  document.querySelector('.pets-button').addEventListener('click',goToPets);

})();


// ---------------------------------------------------------
// добавим работу с данными из JSON
// - генерация слайдов из JSON
// - попап с данными из JSON
// ---------------------------------------------------------
(function(){
  let sliderItems = document.querySelectorAll(`.slider-item`);
  let items = []; // массив элементов


  // наполнение массива _items
  sliderItems.forEach(function (item) {
    let i = Math.floor(Math.random() * petsDataArray.length);
    // Исключим повторение
    let isExist = ()=>{
      //return false;
      return items.filter((el)=>{
        if (el.petsArrIndex == i) {
          return true;
        } else {
          return false;
        }
      }).length;
    }

    while (isExist()) {
      i = Math.floor(Math.random() * petsDataArray.length);
    }

    items.push({element: item, petsArrIndex:i});
  });

  function renderSlide(item){
    let dt = petsDataArray[item.petsArrIndex];

    item.element.querySelector('.pets-slider__card-photo').src = dt.img;
    item.element.querySelector('.pets-slider__card-caption').innerHTML = dt.name;
  }

  //console.log(items);

  items.forEach((item)=>{
    renderSlide(item);
  });

})();


