import 'normalize.css';
import '../css/style.scss';

import './switchers.js';
import './loadData.js';
import {renderUpdateDate} from './header.js';
import {renderTotalTable, renderCountryList} from './tables';

import store from './store.js';

store.subscribe(renderTotalTable, store.getTotalTableData);
store.subscribe(renderUpdateDate, store.getUpdateDate);
store.subscribe(renderCountryList, store.getCountriesList);
