import 'normalize.css';
import '../css/style.scss';

import './switchers.js';
import './loadData.js';
import {renderUpdateDate} from './header.js';
import
{ renderTotalTable,
  renderCountryList,
  renderCountryTable,
  renderSearchInput,
} from './tables';
import {renderChartHeader} from './chart';

import store from './store.js';
import selectors from './selectors';

// Подпишем на обновление store рендер-функции
// второй параметр - селектор для подготовки данных для рендера
store.subscribe(renderTotalTable, selectors.getTotalTableData);
store.subscribe(renderUpdateDate, selectors.getUpdateDate);
store.subscribe(renderCountryList, selectors.getCountriesList);
store.subscribe(renderCountryTable, selectors.getCountryTableDate);
store.subscribe(renderSearchInput, selectors.getSearchInput);
store.subscribe(renderChartHeader, selectors.getChartHeader);
