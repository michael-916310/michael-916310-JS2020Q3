import {gameObj} from './game';

function addHeader(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('afterbegin', `
  <header class="header">
    <h1>Пятнашки</h1>
    <h2>задание на RS-school</h2>
  </header>
  `);
}

function addBestResult(){

  gameObj.DOMElm.rootElm.insertAdjacentHTML('afterbegin', `
    <article class="best-result-container">

      <fieldset class="fieldset">
        <legend>Лучшие результаты:</legend>

      </fieldset>

    </article>
  `);
}

function loadBestResultList(){
  if (gameObj.DOMElm.bestResultContainer) {
    let arr = gameObj.bestResultArr.sort((a,b)=>{
      return a.steps-b.steps;
    });

    if (arr.length) {
      let fr = document.createDocumentFragment();
      arr.forEach((item,idx)=>{
        let div = document.createElement('div');
        div.innerHTML =`
          <span class="result-row__steps">
            шагов: ${item.steps}
          </span>
          <span class="result-row__time">
            длительность: ${item.duration} сек
          </span>
        `;
        fr.appendChild(div);
      });
      gameObj.DOMElm.bestResultContainer.firstElementChild.appendChild(fr);
    }

  }
}

function generateLayout() {

  addBestResult();
  addHeader();

  gameObj.updateDOMElmList();

  loadBestResultList();

  //console.log(gameObj.DOMElm);
}

export { generateLayout};