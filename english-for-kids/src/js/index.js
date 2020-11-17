import 'normalize.css';
import '../css/style.scss';

import initMenu from './menu.js';
import initMainPage from './mainPage.js';
import renderCategoryPage from './categoryPage';
import gameCore from './gameCore';
import renderGameProcess from './gameProcess';


gameCore.renders.renderMenu = initMenu;
gameCore.renders.renderMainPage = initMainPage;
gameCore.renders.renderCategoryPage = renderCategoryPage;
gameCore.renders.renderGameProcess = renderGameProcess;
gameCore.start();


