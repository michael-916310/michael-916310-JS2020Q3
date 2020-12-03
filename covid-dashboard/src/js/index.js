import 'normalize.css';
import '../css/style.scss';

import './switchers.js';
import './loadData.js';
import {renderUpdateDate} from './header.js';
import {renderTotalTable, renderCountryList, renderCountryTable} from './tables';

import store from './store.js';


// Подпишем на обновление store рендер-функции
// второй параметр - селектор для подготовки данных для рендера
store.subscribe(renderTotalTable, store.getTotalTableData);
store.subscribe(renderUpdateDate, store.getUpdateDate);
store.subscribe(renderCountryList, store.getCountriesList);
store.subscribe(renderCountryTable, store.getCountryTableDate);
