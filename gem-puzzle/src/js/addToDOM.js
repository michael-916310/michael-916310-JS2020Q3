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

export {addHeader, addResultAndConfig, addControlsBtn, addGameArea, addDescription};