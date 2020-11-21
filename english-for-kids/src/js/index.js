import 'normalize.css';
import '../css/style.scss';

import initMenu from './menu';
import initMainPage from './mainPage';
import renderCategoryPage from './categoryPage';
import gameCore from './gameCore';
import renderGameProcess from './gameProcess';
import renderGameResult from './gameResult';
import renderGameStatistic from './statisticPage.js';


gameCore.renders.renderMenu = initMenu;
gameCore.renders.renderMainPage = initMainPage;
gameCore.renders.renderCategoryPage = renderCategoryPage;
gameCore.renders.renderGameProcess = renderGameProcess;
gameCore.renders.renderGameResult = renderGameResult;
gameCore.renders.renderGameStatistic = renderGameStatistic;
gameCore.start();


