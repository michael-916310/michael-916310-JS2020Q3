import {categoryList} from './gameData.js';
import gameCore from './gameCore';

const CHECKBOX_CLASS_NAME = 'mobile-menu__checkbox';
const CONTAINER_CLASS_NAME = 'mobile-menu__container';
const LIST_CLASS_NAME = 'mobile-menu__list';

function addToDOM(){
  let elCnt = document.querySelector(`.${LIST_CLASS_NAME}`);

  const fr = document.createDocumentFragment();

  categoryList.forEach((el)=>{
    let li = document.createElement('li');
    li.classList.add('mobile-menu__item');

    let a = document.createElement('a');
    a.classList.add('mobile-menu__link');
    a.href='#';
    a.innerText = el.itemName;

    // зафиксируем в элементе меню ID категории
    // обработаем при клике
    a.dataset.categoryId = el.id;

    li.appendChild(a);
    fr.appendChild(li);
  });

  elCnt.appendChild(fr);
}

function addEvents(fnClick){
  const elms = document.querySelectorAll('.mobile-menu__link');
  const checkEl = document.querySelector(`.${CHECKBOX_CLASS_NAME}`);
  const menuContainerEl = document.querySelector(`.mobile-menu__container`);

  elms.forEach((el, idx, menuList)=>{
    el.addEventListener('click', ()=>{
      // Вызовем колл-бэк
      fnClick(el.dataset.categoryId);
      // Закроем меню
      checkEl.checked = false;
    });
  })

  checkEl.addEventListener('click',()=>{
    if (checkEl.checked){
      // Выделем текущий элемент
      elms.forEach((menuItem)=>{
        menuItem.classList.remove('mobile-menu__link-current');
        if (menuItem.dataset.categoryId == gameCore.state.currentCategoryId) {
          menuItem.classList.add('mobile-menu__link-current');
        }
      });
    }
  });


  // Обработаем клик не на меню
  document.addEventListener('click', (e)=>{
    if (checkEl.checked){
      if (!menuContainerEl.contains(e.target)) {
        let cl = e.target.classList;
        if (!cl.contains('mobile-menu__btn')
            && !cl.contains('mobile-menu__checkbox')
            && !cl.contains('mobile-menu__icon')
            ) {
          // Закроем меню
          checkEl.checked = false;
        }
      }
    }

  });
}

function initMenu(fnMenuItemClick) {
  addToDOM();
  addEvents(fnMenuItemClick);
}

export default initMenu;