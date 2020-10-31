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
            <option value="3" selected>3*3</option>
            <option value="4">4*4</option>
            <option value="5">5*5</option>
            <option value="6">6*6</option>
            <option value="7">7*7</option>
            <option value="8">8*8</option>
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
        <span>ходов:</span> <strong class="game-steps">0</strong>
        <span>длительность:</span> <strong class="game-duration">00:00</strong>
    </fieldset>

    <div class="game-area game-area-3"></div>

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

    // чистим то что есть
    while (gameObj.DOMElm.gameArea.childNodes.length){
      gameObj.DOMElm.gameArea.firstChild.remove();
    }

    gameObj.DOMElm.dominoElmArr = [];

    if (arr.length) {
      let fr = document.createDocumentFragment();
      arr.forEach((item, idx)=>{
        let div = document.createElement('div');
        div.innerText = item.num;
        div.setAttribute('data-idx', idx);
        div.classList.add('domino');
        div.classList.add(`domino-${gameObj.config.areaSize}`);
        if (item.isEmpty) {
          div.classList.add('domino-empty');
        }

        gameObj.DOMElm.dominoElmArr.push(div);
        fr.appendChild(div);
      });
      gameObj.DOMElm.gameArea.appendChild(fr);
    }
    //console.log(`reloadGameData finished`);
  }
}

function reloadCurrentResult(){
  if (gameObj.DOMElm.gameSteps) {
    gameObj.DOMElm.gameSteps.innerText = gameObj.stepsCount;
  }
  if (gameObj.DOMElm.gameDuration)  {
    let h = Math.floor(gameObj.gameDuration / 60), hh = (`${h}`.length==1?`0${h}`:`${h}`);
    let s = gameObj.gameDuration - h * 60, ss = (`${s}`.length==1?`0${s}`:`${s}`);

    gameObj.DOMElm.gameDuration.innerText = `${hh}:${ss}`;
  }
  //console.log(`gameObj.gameDuration:${gameObj.gameDuration} gameObj.stepsCount:${gameObj.stepsCount}`);
}

function prepareDragAndDrop(){
  let topIdx = -1, bottomIdx = -1, leftIdx = -1, rightIdx = -1, emptyIdx = -1;
  for (let i=0; i<gameObj.dominoArr.length; i++){

    // От пустой ячейки найдем те что можно сдвинуть
    if (gameObj.dominoArr[i].isEmpty) {
      emptyIdx = i;
      // подготовим к drug&drop соседние ячейки
      topIdx = i - gameObj.config.areaSize;
      bottomIdx = (i + gameObj.config.areaSize)<gameObj.dominoArr.length ? (i + gameObj.config.areaSize) : -1;

      if ( (i % gameObj.config.areaSize) > 0 ){
        // левая ячейка не первая в строке
        leftIdx = i - 1;
      }

      if ( (i + 1) < gameObj.dominoArr.length ) {
        // правая ячейка не последний элемент в строке
        if ((i+1)%gameObj.config.areaSize>0){
          rightIdx = i+1;
        }
      }
    }
  }

  if (emptyIdx>=0) {
    let elm = gameObj.DOMElm.dominoElmArr[emptyIdx];
    elm.addEventListener('dragover', (e)=>{
      e.preventDefault();
    })
    elm.addEventListener('drop', (e)=>{
      e.preventDefault();
      let idx = e.dataTransfer.getData("text");

      if (gameObj.moveDomino(+idx)) {
        refresh();
      }

    })
  }

  function cellToDrop(idx){
    let elm = gameObj.DOMElm.dominoElmArr[idx];

    elm.classList.add('domino-active');
    elm.setAttribute('draggable', true);
    elm.addEventListener('dragstart', (e)=>{
      e.dataTransfer.setData("text", e.target.dataset.idx);
    })
  }

  if (topIdx>=0){
    cellToDrop(topIdx);
    // let elm = gameObj.DOMElm.dominoElmArr[topIdx];

    // elm.classList.add('domino-active');
    // elm.setAttribute('draggable', true);
    // elm.addEventListener('dragstart', (e)=>{
    //   e.dataTransfer.setData("text", e.target.dataset.idx);
    // })
  }
  if (bottomIdx>=0){
    cellToDrop(bottomIdx);
    // let elm = gameObj.DOMElm.dominoElmArr[bottomIdx];

    // elm.classList.add('domino-active');
    // elm.setAttribute('draggable', true);
    // elm.addEventListener('dragstart', (e)=>{
    //   e.dataTransfer.setData("text", e.target.dataset.idx);
    // })
  }
  if (leftIdx>=0){
    cellToDrop(leftIdx);
  }
  if (rightIdx>=0){
    cellToDrop(rightIdx);
  }

  //console.log(`topIdx:${topIdx} bottomIdx:${bottomIdx} leftIdx:${leftIdx} rightIdx:${rightIdx}`);
}

function refresh(){
  setGameAreaColumnsCount();
  reloadGameData();
  reloadCurrentResult();
  prepareDragAndDrop();
}

function setGameAreaColumnsCount() {
  if (gameObj.config.areaSize) {

    let cl = gameObj.DOMElm.gameArea.classList;

    // уберем предыдущее значение
    for(let i=0; i<cl.length; i++){
      let clName = cl[i].replace('game-area','');
      if (clName.length){
        cl.remove(cl[i]);
      }
    }

    cl.add(`game-area-${gameObj.config.areaSize}`);
  }
}

function generateLayout() {

  // начальная инициализация данных
  gameObj.restartGame(reloadCurrentResult);

  // Начальное создание разделов страницы
  addHeader();
  addBestResult();
  addConfig();
  addControlsBtn();
  addGameArea();

  document.querySelector('#config__area-size_id').addEventListener('change',function(e){
    if (confirm('При смене размера поля игра начнется заново, подвтердите')) {
      gameObj.config.areaSize = +this.value;
      gameObj.restartGame(reloadCurrentResult);
      refresh();
    } else {
      this.value = gameObj.config.areaSize;
    }
  })

  document.querySelector('.game-controls-new-btn').addEventListener('click',(el)=>{
    gameObj.restartGame(reloadCurrentResult);
    refresh();
  });

  // сохраним ссылки на созданные разделы в головном объекте
  gameObj.updateDOMElmList();

  if (gameObj.DOMElm.gameArea) {
    gameObj.DOMElm.gameArea.addEventListener('click',(e)=>{
      if (gameObj.moveDomino(+e.target.dataset.idx)) {
        refresh();
      }
    })
  }

  // Подгрузка данных в ранее созданные разделы
  loadBestResultList();
  refresh();

  //console.log(gameObj.DOMElm);
}

export {generateLayout};