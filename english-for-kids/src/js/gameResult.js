import gameCore from './gameCore';

const GAME_RESULT_ELM = document.querySelector('.game-result');

export default function renderGameResult(){

  // чистим все
  while (GAME_RESULT_ELM.firstChild) {
    GAME_RESULT_ELM.firstChild.remove();
  }

  // прячем все страницы
  gameCore.hideAll();
  // отображаем страницу результатов
  gameCore.DOMElements.gameResult.classList.remove('game-result__hide');

  // рисуем результат
  const fr = document.createDocumentFragment();
  const wrongCount = gameCore.state.currentGame.wrongAnswers;
  const caption = document.createElement('span');
  caption.innerText = (wrongCount)?`${wrongCount} wrong`:`Congratulations !!!`;
  fr.append(caption);

  fr.append(document.createElement('br'));

  const img = document.createElement('img');
  const a = new Audio;
  if (wrongCount) {
    img.src = 'img/failure.jpg';
    a.src='audio/failure.mp3';
  } else {
    img.src = 'img/success.jpg';
    a.src='audio/success.mp3';
  }
  a.autoplay = true;

  img.classList.add('game-result__img');
  fr.append(img);

  GAME_RESULT_ELM.append(fr);

}