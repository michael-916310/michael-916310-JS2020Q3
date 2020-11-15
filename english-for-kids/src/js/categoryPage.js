import {categoryData} from './gameData';

const CATEGORY_PAGE_ELM = document.querySelector('.category-page');

function renderCategoryPage(id){

  // почистим то что есть
  while (CATEGORY_PAGE_ELM.firstChild){
    CATEGORY_PAGE_ELM.firstChild.remove();
  }

  const fr = document.createDocumentFragment();
  categoryData.get(id).forEach((v,key)=>{
    const section = document.createElement("section");
    section.classList.add('category-page__card');
    section.style.backgroundImage = `url("${v.image}")`;

    section.insertAdjacentHTML('beforeend',`
      <footer class="category-page__card-footer">
        <span>${v.word}</span>
        <img class="category-page__card-rotate" src="./img/rotate.svg">
      </footer>
    `);

    fr.append(section);
  });

  CATEGORY_PAGE_ELM.append(fr);
}


export default renderCategoryPage;
