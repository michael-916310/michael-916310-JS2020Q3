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

import {
  renderChartHeader,
  renderChart
} from './chart';

import store from './store.js';
import selectors from './selectors';

import {
  CHART_FROM_CHANGED,
  CHART_TILL_CHANGED,
} from './consts';

import {loadChartData} from './loadData.js';

// Подпишем на обновление store рендер-функции
// второй параметр - селектор для подготовки данных для рендера
// рендеры выполняются при любом изменении сторе
store.subscribe(renderTotalTable, selectors.getTotalTableData);
store.subscribe(renderUpdateDate, selectors.getUpdateDate);
store.subscribe(renderCountryList, selectors.getCountriesList);
store.subscribe(renderCountryTable, selectors.getCountryTableDate);
store.subscribe(renderSearchInput, selectors.getSearchInput);
store.subscribe(renderChartHeader, selectors.getChartHeader);
store.subscribe(renderChart, selectors.getChartData);

// сконфигурируем автоматические действия
// в ответ на начальный диспатч
// выполняются при диспатче определенных акшинов
store.setAutoActivity(
  [
    CHART_FROM_CHANGED,
    CHART_TILL_CHANGED,
  ],
  [
    loadChartData,
  ]
);
