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
      return (a[by]-b[by]);
    }
    if (typeof(a[by])==='string') {
      return (b[by].localeCompare(a[by]));
    }
    return (b[by]-a[by]);
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

function addToDOM(){

  // чистим таблицу
  let tRow = document.querySelector('.statistic-table__line');
  while (tRow){
    tRow.remove();
    tRow = document.querySelector('.statistic-table__line');
  }

  prepareData();

  let statData = localStorage.getItem(LOCAL_STORAGE_STATISTIC_KEY);
  if (!statData) {
    return;
  }
  statData= JSON.parse(statData);

  const fr = document.createDocumentFragment();
  categoryData.forEach((catData, catKey)=>{
    const catName = categoryList.filter((el)=>{
      return (el.id === catKey);
    })[0].itemName;
    catData.forEach((item, itemKey)=>{
      const statLine = statData[catKey][itemKey];
      let rate = Math.round(statLine.successAttempts/(statLine.successAttempts + statLine.failureAttempts)*100);
      rate = (!rate)?0:rate;

      const tr = document.createElement('tr');
      tr.classList.add('statistic-table__line');
      tr.insertAdjacentHTML(`beforeend`,`
        <td class="statistic-table__row-name-line-1">${catName}</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${statLine.trainingCount}</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${statLine.successAttempts}</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${statLine.failureAttempts}</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">${rate}%</td>
      `);
      fr.append(tr);

      const tr2 = document.createElement('tr');
      tr2.classList.add('statistic-table__line');
      tr2.insertAdjacentHTML(`beforeend`,`
        <td class="statistic-table__row-name-line-2">${item.word}</td>
      `);
      fr.append(tr2);

      const tr3 = document.createElement('tr');
      tr3.classList.add('statistic-table__line');
      tr3.insertAdjacentHTML(`beforeend`,`
        <td class="statistic-table__row-name-line-3">${item.translation}</td>
      `);
      fr.append(tr3);

    })
  })

  document.querySelector('.statistic-table__header').after(fr);

}

function addEvents(){
  SORT_BY_EML.addEventListener('change', ()=>{
    console.log(`SORT_BY_EML changed:${SORT_BY_EML.value}`);
    resortData(data);
    console.log(data);
  });

  SORT_ORDER_EML.addEventListener('change', (e)=>{
    console.log(`SORT_ORDER_EML changed:${SORT_ORDER_EML.value}`);
    resortData(data);
    console.log(data);
  });
}

export default function renderGameStatistic() {
  addToDOM();
  addEvents()
}