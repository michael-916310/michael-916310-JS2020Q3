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
    console.log(`${catData} ${catKey}`);
    catData.forEach((item)=>{
      const tr = document.createElement('tr');
      tr.classList.add('statistic-table__line');
      tr.insertAdjacentHTML(`beforeend`,`
        <td class="statistic-table__cell">Action (set A)</td>
        <td class="statistic-table__cell">${item.word}</td>
        <td class="statistic-table__cell">${item.translation}</td>
        <td class="statistic-table__cell statistic-table__cell_center">25</td>
        <td class="statistic-table__cell statistic-table__cell_center">12</td>
        <td class="statistic-table__cell statistic-table__cell_center">24</td>
        <td class="statistic-table__cell statistic-table__cell_center">33%</td>
      `);

      fr.append(tr);
    })
  })

  document.querySelector('.statistic-table__header').after(fr);

}


export default function renderGameStatistic() {
  addToDOM();
}