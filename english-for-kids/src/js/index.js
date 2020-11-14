import 'normalize.css';
import '../css/style.scss';

import initMenu from './menu.js';
import initMainPage from './mainPage.js';

initMenu((id)=>{
  console.log('clicked categoryId:'+id);
});

initMainPage();

