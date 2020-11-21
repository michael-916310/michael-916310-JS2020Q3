import {categoryList} from './gameData';

const elCnt = document.querySelector('.main-page__container') ;

function renderMe(){
  while (elCnt.firstChild) {
    elCnt.firstChild.remove();
  }

  const fr = document.createDocumentFragment();

  categoryList.forEach((el)=>{
    const section = document.createElement('section');
    section.classList.add('main-page-card');
    section.insertAdjacentHTML('beforeend',`
      <a class="main-page-card__ref" href='#' data-category-id=${el.id}>
        <h2 class="main-page-card__h2">${el.itemName}</h2>
        <img class="main-page-card__img" src="${el.image}">
      </a>
    `);
    fr.append(section);
  });

  elCnt.append(fr);
}

function addEvents(fnClick){
  document.querySelectorAll('.main-page-card__ref').forEach((el)=>{
    el.addEventListener('click', ()=>{
      fnClick(el.dataset.categoryId);
    });
  });
}

function initMainPage(fnClick){
  renderMe();
  addEvents(fnClick)
}

export default initMainPage;