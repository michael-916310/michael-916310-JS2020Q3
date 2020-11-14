import 'normalize.css';
import '../css/style.scss';

import initMenu from './menu.js';
import initMainPage from './mainPage.js';
import {gameState} from './gameData';

initMenu((id)=>{
  console.log('clicked categoryId:'+id);
});

gameState.renderMainPage = initMainPage;
gameState.start();



/*
initMainPage((id)=>{
  console.log('clicked categoryId:'+id);
});
*/
