import 'normalize.css';
import '../css/style.scss';

import initMenu from './menu.js';

initMenu((id)=>{
  console.log('clicked categoryId:'+id);
});

