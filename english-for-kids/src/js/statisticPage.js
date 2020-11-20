import {categoryList, categoryData} from  './gameData';

function addToDOM(){

  // чистим таблицу
  let tRow = document.querySelector('.statistic-table__line');
  while (tRow){
    tRow.remove();
    tRow = document.querySelector('.statistic-table__line');
  }

  const fr = document.createDocumentFragment();

  categoryData.forEach((catData, catKey)=>{
    const catName = categoryList.filter((el)=>{
      return (el.id === catKey);
    })[0].itemName;
    catData.forEach((item)=>{
      const tr = document.createElement('tr');
      tr.classList.add('statistic-table__line');
      tr.insertAdjacentHTML(`beforeend`,`
        <td class="statistic-table__row-name-line-1">${catName}</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">25</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">12</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">24</td>
        <td rowspan="3" class="statistic-table__cell statistic-table__cell_center">33%</td>
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


export default function renderGameStatistic() {
  addToDOM();
}