import gameCore from './gameCore';

const GAME_PROCESS_ELM = document.querySelector('.game-process-container');

function renderGameProcess(){
  while (GAME_PROCESS_ELM.firstChild){
    GAME_PROCESS_ELM.firstChild.remove();
  }

  if (gameCore.state.isGameRunning) {
    const fr = document.createDocumentFragment();
    const arr = [...gameCore.state.currentGame.answers];

      for (let i=arr.length-1; i>=0; i--){
        if ((arr.length - i) <= 10){
          const img = document.createElement('img');
          if (arr[i].isOk){
            img.src='img/star-win.svg';
          } else {
            img.src='img/star.svg';
          }
          fr.append(img);
        }
      }

    GAME_PROCESS_ELM.append(fr);
  }
}

export default renderGameProcess;