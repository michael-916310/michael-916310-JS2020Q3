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

function addConfig(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('afterbegin', `
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
  gameObj.DOMElm.rootElm.insertAdjacentHTML('afterbegin', `
  <div class="game-controls-container">
    <button class="game-controls-btn game-controls-new-btn">новая игра</button>
    <button class="game-controls-btn game-controls-save-btn">сохранить текущую</button>
    <button class="game-controls-btn game-controls-load-btn">загрузить ранее сохраненную</button>
  </div>
  `);
}

function addGameArea(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('afterbegin', `
  <article class="game-container">

    <fieldset class="fieldset">
      <legend>Текущий результат</legend>
        <span>ходов:</span> <strong>2</strong>
        <span>длительность:</span> <strong>220 сек</strong>
    </fieldset>

    <div class="game-area">

    </div>

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

function loadGameData(){
  if (gameObj.DOMElm.gameArea) {
    let arr = [...gameObj.dominoArr];

    if (arr.length) {
      let fr = document.createDocumentFragment();
      arr.forEach((item,idx)=>{
        let div = document.createElement('div');
        div.innerHTML =`<div class="${item.isEmpty?'domino-empty':'domino'}">${item.num}</div>`;
        fr.appendChild(div);
      });
      gameObj.DOMElm.gameArea.appendChild(fr);
    }

  }
}

function generateLayout() {

  // Начальное создание разделов
  addGameArea();
  addControlsBtn();
  addConfig();
  addBestResult();
  addHeader();
  gameObj.updateDOMElmList(); // сохраним созданные разделы в головном объекте

  // Подгрузка данных в ранее созданные разделы
  loadBestResultList();
  loadGameData();
  console.log(gameObj.DOMElm);
}

export { generateLayout, loadBestResultList};