import {gameObj} from './game';
import {addHeader, addResultAndConfig, addControlsBtn, addGameArea, addDescription} from './addToDOM.js';
import {loadBestResultList, reloadGameData, formatDuration, reloadCurrentResult} from './utils';


function prepareDragAndDrop(){
  let topIdx = -1, bottomIdx = -1, leftIdx = -1, rightIdx = -1, emptyIdx = -1;
  for (let i=0; i<gameObj.dominoArr.length; i++){

    // От пустой ячейки найдем те что можно сдвинуть
    if (gameObj.dominoArr[i].isEmpty) {
      emptyIdx = i;
      // подготовим к drug&drop соседние ячейки
      topIdx = i - gameObj.config.areaSize;
      bottomIdx = (i + gameObj.config.areaSize)<gameObj.dominoArr.length ? (i + gameObj.config.areaSize) : -1;

      if ((i % gameObj.config.areaSize)>0){
        // левая ячейка не первая в строке
        leftIdx = i - 1;
      }

      if ((i + 1)<gameObj.dominoArr.length) {
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