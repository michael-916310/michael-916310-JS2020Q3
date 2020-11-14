import {categoryList} from './gameData';

const elCnt = document.querySelector('.main-page__container') ;

function remderMe(){
  while (elCnt.firstChild) {
    elCnt.firstChild.remove();
  }

  const fr = document.createDocumentFragment();

  categoryList.forEach((el)=>{
    const section = document.createElement('section');
    section.classList.add('main-page-card');
    section.insertAdjacentHTML('beforeend',`
      <a class="main-page-card__ref"href='#'>
        <h2 class="main-page-card__h2">${el.itemName}</h2>
        <img class="main-page-card__img" src="${el.image}">
      </a>
    `);
    fr.append(section);
  });

  elCnt.append(fr);
}

function initMainPage(){
  remderMe();
}

export default initMainPage;