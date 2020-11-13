
let menuData = [
  {id: 0, itemName: 'Main page'},
  {id: 1, itemName: 'Action (set A)'},
  {id: 2, itemName: 'Action (set B)'},
  {id: 3, itemName: 'Animal (set A)'},
  {id: 4, itemName: 'Animal (set B)'},
  {id: 5, itemName: 'Clothes'},
  {id: 6, itemName: 'Emotions'},
  {id: 7, itemName: 'Something'},
  {id: 8, itemName: 'Something'}
]

function addToDOM(containerName){
  let elCnt = document.querySelector(`.${containerName}`);

  // почистим то что есть
  while (elCnt.childNodes.length) {
    elCnt.firstChild.remove();
  }

  const fr = document.createDocumentFragment();

  menuData.forEach((el)=>{
    let li = document.createElement('li');
    li.classList.add('mobile-menu__item');

    let a = document.createElement('a');
    a.classList.add('mobile-menu__link');
    a.href='#';
    a.innerText = el.itemName;

    // зафиксируем в элементе меню ID категории
    // обработаем при клике
    a.dataset.categoryId = el.id;

    li.appendChild(a);
    fr.appendChild(li);
  });

  elCnt.appendChild(fr);
}

function addEvents(fnClick){
  const elms = document.querySelectorAll('.mobile-menu__link');
  elms.forEach((el)=>{
    el.addEventListener('click', ()=>{
      fnClick(el.dataset.categoryId);
    });
  })
}

function renderMenu(containerName,fnClick) {
  addToDOM(containerName);
  addEvents(fnClick);
}

export default renderMenu;