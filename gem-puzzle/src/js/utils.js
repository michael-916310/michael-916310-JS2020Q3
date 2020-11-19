import {gameObj} from './game';

export function loadBestResultList(){
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

export function reloadGameData(){
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
  }
}

export function formatDuration(){
  if (gameObj.gameDuration)  {
    let h = Math.floor(gameObj.gameDuration / 60), hh = (`${h}`.length==1?`0${h}`:`${h}`);
    let s = gameObj.gameDuration - h * 60, ss = (`${s}`.length==1?`0${s}`:`${s}`);

    return `${hh}:${ss}`;
  }
  return '00:00'
}

export function reloadCurrentResult(){
  if (gameObj.DOMElm.gameSteps) {
    gameObj.DOMElm.gameSteps.innerText = gameObj.stepsCount;
  }
  if (gameObj.DOMElm.gameDuration)  {
    gameObj.DOMElm.gameDuration.innerText = formatDuration();
  }
}
