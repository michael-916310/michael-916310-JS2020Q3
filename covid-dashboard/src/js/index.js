import 'normalize.css';
import '../css/style.scss';

import './switchers.js';
import './loadData.js';
import './header.js';
import {renderTotalTable} from './tables';

import store from './store.js';

// store.subscribe((state)=>{
//   console.log(state);
// })
store.subscribe(renderTotalTable, store.getTotalTableData);