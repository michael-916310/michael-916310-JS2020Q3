import {gameObj} from './game';

function addHeader(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
  <header class="header">
    <h1>Пятнашки</h1>
    <h2>задание на RS-school</h2>
  </header>
  `);
}

function addResultAndConfig(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
    <article class = "result_config-container">

      <article class="best-result-container">
        <fieldset class="fieldset"></fieldset>
      </article>

      <article class="config-container">

        <fieldset class="fieldset">
          <legend>Настройки:</legend>

          <div class="config__area-size-container">
            <label for="config__area-size_id">Размер поля: </label>
              <select class="config__area-size" id="config__area-size_id">
                <option value="3">3*3</option>
                <option value="4" selected>4*4</option>
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
    <article class="game-container-bg">
      <article class="game-container">

        <fieldset class="fieldset">
          <legend>Текущий результат</legend>
            <span>ходов:</span> <strong class="game-steps">0</strong>
            <span>длительность:</span> <strong class="game-duration">00:00</strong>
        </fieldset>

        <div class="game-area game-area-3"></div>

      </article>
    </article>
  `);
}

function addDescription(){
  gameObj.DOMElm.rootElm.insertAdjacentHTML('beforebegin', `
  <article class="desc-container">
    <h3>Что сделано</h3>
    <ul>
      <li>Basic scope +30
        <ul>
          <li> вёрстка, дизайн, UI: +10</li>
          <li> состояние игрового поля генерируется случайным образом: +10</li>
          <li> при клике по фишке, стоящей рядом с пустой клеткой, фишка перемещается на место пустой клетки: +10</li>
        </ul>
      <li>Advanced scope +60
        <ul>
          <li> игру можно начать заново без перезагрузки страницы: +10</li>
          <li> отображается время игры и количество ходов: +10</li>
          <li> фишки можно перетягивать мышкой: +10</li>
          <li> реализовано сохранение состояния игры и сохранение 10 лучших результатов с использованием LocalStorage: +10</li>
          <li> реализован выбор размера поля: +10</li>
          <li> звуковое сопровождение передвижения фишек: +10</li>
        </ul>
      </li>
      <li>Hacker scope +20
        <ul>
          <li>анимация перемещения пятнашек на поле: +10</li>
          <li>когда игра закончилась, выводится сообщение «Ура! Вы решили головоломку за ##:## и N ходов»: +10</li>
        </ul>
      </li>
      <li>Технические (проверяются ментором):
        <ul>
          <li> подключен и используется eslint, : +10</li>
          <li> подключен и используется webpack, : +10</li>
          <li> приложение разбито на отдельные модули, используются фишки es6 и выше (на усмотрение ментора): +20</li>
        </ul>
      </li>
      </li>
    </ul>
  </article>
  `);
}

function loadBestResultList(){
  if (gameObj.DOMElm.bestResultContainer) {
    let arr = [...gameObj.bestResultArr];

    // чистим то что есть
    while (gameObj.DOMElm.bestResultContainer.firstElementChild.childNodes.length){
      gameObj.DOMElm.bestResultContainer.firstElementChild.firstChild.remove();
    }

    let fr = document.createDocumentFragment();

    let lg = document.createElement('legend');
    lg.innerText = 'Лучшие результаты (по ходам)';
    gameObj.DOMElm.bestResultContainer.firstElementChild.appendChild(lg);

    arr.forEach((item,idx)=>{
      let div = document.createElement('div');

      let h = Math.floor(item.duration / 60), hh = (`${h}`.length==1?`0${h}`:`${h}`);
      let s = item.duration - h * 60, ss = (`${s}`.length==1?`0${s}`:`${s}`);

      div.innerHTML =`поле:${item.areaSize}*${item.areaSize} ходов:${item.stepsCount} время: ${hh}:${ss}`;
      fr.appendChild(div);
    });
    gameObj.DOMElm.bestResultContainer.firstElementChild.appendChild(fr);

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

function formatDuration(){
  if (gameObj.gameDuration)  {
    let h = Math.floor(gameObj.gameDuration / 60), hh = (`${h}`.length==1?`0${h}`:`${h}`);
    let s = gameObj.gameDuration - h * 60, ss = (`${s}`.length==1?`0${s}`:`${s}`);

    return `${hh}:${ss}`;
  }
  return '00:00'
}

function reloadCurrentResult(){
  if (gameObj.DOMElm.gameSteps) {
    gameObj.DOMElm.gameSteps.innerText = gameObj.stepsCount;
  }
  if (gameObj.DOMElm.gameDuration)  {
    gameObj.DOMElm.gameDuration.innerText = formatDuration();
  }
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

      gameObj.moveDomino(+idx, refresh);

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
  }
  if (bottomIdx>=0){
    cellToDrop(bottomIdx);
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
  if (gameObj.isGameFinished()) {
    alert(`Ура! Вы решили головоломку за ${formatDuration()} и ${gameObj.stepsCount} ходов`);
    gameObj.addResultToList();
    gameObj.loadResults();
    loadBestResultList();
    gameObj.restartGame(reloadCurrentResult);
  }

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
  addResultAndConfig();
  addControlsBtn();
  addGameArea();
  addDescription();

  // сохраним ссылки на созданные разделы в головном объекте
  gameObj.updateDOMElmList();

  document.querySelector('.game-controls-new-btn').addEventListener('click',(el)=>{
    if (confirm('Будет создана новая игра.\nТекущая игра будет потеряна.\nПодтвердите.')) {
      gameObj.restartGame(reloadCurrentResult);
      refresh();
    }
  });

  document.querySelector('.game-controls-save-btn').addEventListener('click',(el)=>{
    if (confirm('Текущая игра будет сохранена.\nВы сможете загрузить её по кнопке "загрузить ранее сохраненную игру".\n\nПодтвердите.')) {
      gameObj.saveCurrentGame();
    }
  });

  document.querySelector('.game-controls-load-btn').addEventListener('click',(el)=>{
    if (confirm('Текущая игра будет перезаписана ранее сохраненной игрой.\nВы не сможете вернуться к текущй игре".\n\nПодтвердите.')) {

      gameObj.loadCurrentGame();

      if (gameObj.DOMElm.areaSizeElm) {
        gameObj.DOMElm.areaSizeElm.value = gameObj.config.areaSize;
      }

      if (gameObj.DOMElm.soundElm) {
        gameObj.DOMElm.soundElm.checked = gameObj.config.isSound;
      }

      refresh();
    }
  });

  if (gameObj.DOMElm.areaSizeElm) {
    gameObj.DOMElm.areaSizeElm.addEventListener('change',function(e){
      if (confirm('При смене размера поля игра начнется заново, подвтердите')) {
        gameObj.config.areaSize = +this.value;
        gameObj.restartGame(reloadCurrentResult);
        refresh();
      } else {
        this.value = gameObj.config.areaSize;
      }
    })
  }

  if (gameObj.DOMElm.gameArea) {
    gameObj.DOMElm.gameArea.addEventListener('click',(e)=>{
      gameObj.moveDomino(+e.target.dataset.idx, refresh)
    })
  }

  if (gameObj.DOMElm.soundElm) {
    gameObj.DOMElm.soundElm.addEventListener('change', function(e){
      gameObj.config.isSound = this.checked;
    })
  }

  // Подгрузка данных в ранее созданные разделы
  loadBestResultList();
  refresh();

}

export {generateLayout};