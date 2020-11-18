import gameCore from './gameCore';

const GAME_RESULT_ELM = document.querySelector('.game-result');

export default function renderGameResult(){

  // чистим все
  while (GAME_RESULT_ELM.firstChild) {
    GAME_RESULT_ELM.firstChild.remove();
  }

  // прячем все страницы
  gameCore.hideAll();

  // рисуем результат
  const fr = document.createDocumentFragment();
  const wrongCount = gameCore.state.currentGame.wrongAnswers;
  const caption = document.createElement('span');
  caption.innerText = (wrongCount)?`${wrongCount} wrong`:`Congratulations !!!`;
  fr.append(caption);

  fr.append(document.createElement('br'));

  const img = document.createElement('img');
  if (wrongCount) {
    img.src = 'img/failure.jpg';
  } else {
    img.src = 'img/success.jpg';
  }

  img.classList.add('game-result__img');
  fr.append(img);

  GAME_RESULT_ELM.append(fr);

}