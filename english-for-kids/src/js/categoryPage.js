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

    // Обработка клика по карточке
    el.addEventListener('click',(e)=>{
      const index = el.dataset.cardIndex;

      if (gameCore.state.isPlayMode) {
        if (gameCore.state.isGameRunning) {
          if (!el.classList.contains('category-page__card-play-mode_processed')) {
            const idx = gameCore.state.currentGame.itemsOrderToCheck[gameCore.state.currentGame.currentItemIndex];
            const cur = +el.dataset.cardIndex;

            const audio = new Audio();
            if (idx === cur) {
              audio.src = 'audio/correct.mp3';
              el.classList.add('category-page__card-play-mode_processed');
            } else {
              audio.src = 'audio/error.mp3';
            }
            audio.autoplay = true;

            gameCore.addAnswer(idx === cur, idx);

          }
        }
      } else if (e.target.classList.contains('category-page__card-rotate')) {
        el.classList.add('category-page__card-rotated');
        el.querySelector('.category-page__card-footer').classList.add('category-page__card-footer-rotated');
        el.querySelector('.category-page__card-rotate').classList.add('category-page__card-rotate_hide');
        const spanElm = el.querySelector('span');
        spanElm.innerText = categoryData.get(gameCore.state.currentCategoryId)[index].translation

      } else {
        const audio = new Audio();
        audio.src = categoryData.get(gameCore.state.currentCategoryId)[index].audioSrc;
        audio.autoplay = true;
      }
    });

    // снимем стили поворотов при потере фокуса

    el.addEventListener('mouseleave',()=>{
      if (!gameCore.state.isPlayMode) {
        el.classList.remove('category-page__card-rotated');
        el.querySelector('.category-page__card-footer').classList.remove('category-page__card-footer-rotated');
        el.querySelector('.category-page__card-rotate').classList.remove('category-page__card-rotate_hide');
        const spanElm = el.querySelector('span');
        spanElm.innerText = categoryData.get(gameCore.state.currentCategoryId)[el.dataset.cardIndex].word;
      }

    });

})
}

function renderCategoryPage(id){
  addToDOM(id);
  addEvents();
}


export default renderCategoryPage;
