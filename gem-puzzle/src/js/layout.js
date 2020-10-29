import {gameObj} from './game';

function addHeader(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
  <header class="header">
    <h1>Пятнашки</h1>
    <h2>задание на RS-school</h2>
  </header>
  `);
}

function addBestResult(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
    <article class="best-result-container">

      <fieldset class="fieldset">
        <legend>Лучшие результаты:</legend>

      </fieldset>

    </article>
  `);
}

function addConfig(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
  <article class="config-container">

    <fieldset class="fieldset">
      <legend>Настройки:</legend>

      <div class="config__area-size-container">
        <label for="config__area-size_id">Размер поля: </label>
          <select class="config__area-size" id="config__area-size_id">
            <option value="3">3*3</option>
            <option value="4">4*4</option>
            <option value="5">5*5</option>
            <option value="6">6*6</option>
            <option value="7">7*7</option>
            <option value="8" selected>8*8</option>
          </select>
      </div>

      <div class="config_sounds-container">
        <label class="config__sounds" for="config__sounds_chkbox_id">Звук при движении костяшек</label>
        <input type="checkbox" class="config__sounds_chkbox" id="config__sounds_chkbox_id">
      </div>

    </fieldset>

  </article>
  `);
}

function addControlsBtn(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
  <div class="game-controls-container">
    <button class="game-controls-btn game-controls-new-btn">новая игра</button>
    <button class="game-controls-btn game-controls-save-btn">сохранить текущую</button>
    <button class="game-controls-btn game-controls-load-btn">загрузить ранее сохраненную</button>
  </div>
  `);
}

function addGameArea(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
  <article class="game-container">

    <fieldset class="fieldset">
      <legend>Текущий результат</legend>
        <span>ходов:</span> <strong>2</strong>
        <span>длительность:</span> <strong>220 сек</strong>
    </fieldset>

    <div class="game-area"></div>

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
        div.innerHTML =`шагов: ${item.steps} длительность: ${item.duration} сек`;
        fr.appendChild(div);
      });
      gameObj.DOMElm.bestResultContainer.firstElementChild.appendChild(fr);
    }

  }
}

function reloadGameData(){
  if (gameObj.DOMElm.gameArea) {
    let arr = [...gameObj.dominoArr];

    while (gameObj.DOMElm.gameArea.childNodes.length){
      //console.log(`remove:${gameObj.DOMElm.gameArea.firstChild}`);
      gameObj.DOMElm.gameArea.firstChild.remove();
    }

    if (arr.length) {
      let fr = document.createDocumentFragment();
      arr.forEach((item)=>{
        let div = document.createElement('div');
        div.innerText =item.num;
        div.classList.add(item.isEmpty?'domino-empty':'domino');
        fr.appendChild(div);
      });
      gameObj.DOMElm.gameArea.appendChild(fr);
    }

  }
}

function generateLayout() {

  // Начальное создание разделов
  addHeader();
  addBestResult();
  addConfig();
  addControlsBtn();
  addGameArea();

  gameObj.updateDOMElmList(); // сохраним созданные разделы в головном объекте

  // Подгрузка данных в ранее созданные разделы
  loadBestResultList();
  reloadGameData();

  document.querySelector('.game-controls-new-btn').addEventListener('click',(el)=>{
    gameObj.generateDominoArr();
    reloadGameData();
  });

}

export { generateLayout, loadBestResultList};