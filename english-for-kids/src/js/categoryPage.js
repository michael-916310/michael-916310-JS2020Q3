import {categoryData} from './gameData';
import gameCore from './gameCore';

const CATEGORY_PAGE_ELM = document.querySelector('.category-page');

function addToDOM(id){

  // почистим то что есть
  while (CATEGORY_PAGE_ELM.firstChild){
    CATEGORY_PAGE_ELM.firstChild.remove();
  }

  const fr = document.createDocumentFragment();
  categoryData.get(id).forEach((v,key)=>{
    const section = document.createElement("section");
    section.classList.add('category-page__card');
    section.style.backgroundImage = `url("${v.image}")`;
    section.dataset.cardIndex=key;

    if (gameCore.state.isPlayMode){
      section.classList.add('category-page__card-play-mode');
    } else {
        section.insertAdjacentHTML('beforeend',`
          <footer class="category-page__card-footer">
            <span>${v.word}</span>
            <img class="category-page__card-rotate" src="./img/rotate.svg">
          </footer>
      `);

    }

    fr.append(section);
  });

  CATEGORY_PAGE_ELM.append(fr);
}

function addEvents(){
  const cardList = document.querySelectorAll('.category-page__card');

  cardList.forEach((el)=>{
    el.addEventListener('click',(e)=>{
      const index = el.dataset.cardIndex;

      if (gameCore.state.isPlayMode) {
        console.log('play mode');
      } else {
        if (e.target.classList.contains('category-page__card-rotate')) {
          console.log('rotate');
        } else {
          let audio = new Audio();
          audio.src = categoryData.get(gameCore.state.currentCategoryId)[index].audioSrc;
          audio.autoplay = true;
      }
    }
  });
})
}

function renderCategoryPage(id){
  addToDOM(id);
  addEvents();
}

export default renderCategoryPage;
