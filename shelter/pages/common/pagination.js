(function(){
  let dataArr = [];         // этот массив отрисовываем

  let visibleCardList = []; // массов видимых элементов

  let perPage = 0;          // сколько элементов видно на странице за раз
  let pagesTotal = 0;       // сколкьо всего страниц
  let curPage = 1;          // текущая страница


  let curPageBtn = document.querySelector('.pets-slider__page');
  let rightBtn = document.querySelector('.pets-slider__right-step');
  let rightAllBtn = document.querySelector('.pets-slider__right-all');

  // сгенерим 48 элементов так чтобы каждые 8 не повторялись
  (function(){
    for (i=0; i<6; i++){
      let oneLine=[];
      for (j=0; j<8; j++){
        let petsArrIndex = Math.floor(Math.random() * petsDataArray.length);

        let isExist = ()=>{
          return oneLine.filter((el)=>{
            if (el == petsArrIndex) {
              return true;
            } else {
              return false;
            }
          }).length;
        }

        while (isExist()) {
          petsArrIndex = Math.floor(Math.random() * petsDataArray.length);
        }

        oneLine.push(petsArrIndex);
      }

      //console.log(oneLine);
      dataArr=[...dataArr, ...oneLine];
    }
    //console.log(dataArr);
  })();

  // инициализация
  (function(){
    let allCardList = [...document.querySelectorAll('.pets__card')];
    visibleCardList = allCardList.filter((card)=>{
      return !(getComputedStyle(card).display=="none")
    });

    perPage = visibleCardList.length;
    pagesTotal = dataArr.length / perPage;

    rightBtn.addEventListener('click', ()=>{
      if (curPage<pagesTotal){
        curPage++;
        renderPage();
        setBtnState();
      }
    })

    rightAllBtn.addEventListener('click', ()=>{
      if (curPage<pagesTotal){
        curPage=pagesTotal;
        renderPage();
        setBtnState();
      }
    })

  })();

  function setBtnState(){
    curPageBtn.innerHTML = curPage;
    if (curPage==pagesTotal){
      rightBtn.classList.add('pets-slider__inactive');
      rightBtn.classList.remove('pets-slider__active');

      rightAllBtn.classList.add('pets-slider__inactive');
      rightAllBtn.classList.remove('pets-slider__active');
    }
  }

  function renderPage(){
    let i=0;
    visibleCardList.forEach((el)=>{

      let idx = (curPage-1)*perPage+i;
      if (idx<dataArr.length){
        let dt = petsDataArray[dataArr[idx]];

        el.querySelector('.pets__card-photo').src = dt.img;
        el.querySelector('.pets__card-caption').innerHTML=dt.name;
      }
      i++;

    });
  }

  renderPage(1);

})()