import {categoryList, categoryData} from  './gameData';
import {LOCAL_STORAGE_STATISTIC_KEY} from './const';


const SORT_BY_EML= document.querySelector('.statistic__sort-by');
const SORT_ORDER_EML= document.querySelector('.statistic__sort-order');

let data =[];

function resortData(arr){
  const by = SORT_BY_EML.value;
  data = arr.sort((a,b)=>{
    if (SORT_ORDER_EML.value === 'ascending') {
      if (typeof(a[by])==='string'){
        return (a[by].localeCompare(b[by]));
      }
      return (b[by]-a[by]);
    }
    if (typeof(a[by])==='string') {
      return (b[by].localeCompare(a[by]));
    }
    return (a[by]-b[by]);
  });
}

function prepareData(){
  const result=[];

  let statData = localStorage.getItem(LOCAL_STORAGE_STATISTIC_KEY);
  if (!statData) {
    return [];
  }
  statData= JSON.parse(statData);

  categoryData.forEach((catData, catKey)=>{
    const catName = categoryList.filter((el)=>{
      return (el.id === catKey);
    })[0].itemName;
    catData.forEach((item, itemKey)=>{
      const statLine = statData[catKey][itemKey];
      let rate = Math.round(statLine.successAttempts/(statLine.successAttempts + statLine.failureAttempts)*100);
      rate = (!rate)?0:rate;

      result.push({
        category: catName,
        word: item.word,
        translation: item.translation,
        trainingCount:statLine.trainingCount,
        successAttempts: statLine.successAttempts,
        failureAttempts: statLine.failureAttempts,
        rate,
      });

    })
  })

  // отсортируем и поместим в глобальну переменную
  resortData(result);
}

function renderData(){

  // чистим таблицу
  let tRow = document.querySelector('.statistic-table__line');
  while (tRow){
    tRow.remove();
    tRow = document.querySelector('.statistic-table__line');
  }


  const fr = document.createDocumentFragment();

  data.forEach((el)=>{

    const tr = document.createElement('tr');
    tr.classList.add('statistic-table__line');
    tr.insertAdjacentHTML(`beforeend`,`
      <td class="statistic-table__row-name-line-1">${el.category}</td>
      <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${el.trainingCount}</td>
      <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${el.successAttempts}</td>
      <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${el.failureAttempts}</td>
      <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${el.rate}%</td>
    `);
    fr.append(tr);

    const tr2 = document.createElement('tr');
    tr2.classList.add('statistic-table__line');
    tr2.insertAdjacentHTML(`beforeend`,`
      <td class="statistic-table__row-name-line-2">${el.word}</td>
    `);
    fr.append(tr2);

    const tr3 = document.createElement('tr');
    tr3.classList.add('statistic-table__line');
    tr3.insertAdjacentHTML(`beforeend`,`
      <td class="statistic-table__row-name-line-3">${el.translation}</td>
    `);
    fr.append(tr3);

  });

  document.querySelector('.statistic-table__header').after(fr);
}


function addEvents(){
  SORT_BY_EML.addEventListener('change', ()=>{
    resortData(data);
    renderData();
  });

  SORT_ORDER_EML.addEventListener('change', (e)=>{
    resortData(data);
    renderData();
  });
}

export default function renderGameStatistic() {
  prepareData();
  renderData();
  addEvents()
}