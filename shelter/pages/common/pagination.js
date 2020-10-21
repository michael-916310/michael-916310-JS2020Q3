(function(){
  let dataArr = [];         // этот массив отрисовываем

  let visibleCardList = []; // массов видимых элементов

  let perPage = 0;          // сколько элементов видно на странице за раз
  let pagesTotal = 0;       // сколкьо всего страниц
  let curPage = 1;          // текущая страница

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

    //console.log(perPage, pagesTotal);

  })();


  function renderPage(){
    let i=0;
    //console.log(`curPage:${curPage}`)
    visibleCardList.forEach((el)=>{

      let idx = (curPage-1)*perPage+i;
      if (idx<dataArr.length){
        let dt = petsDataArray[dataArr[idx]];

        el.querySelector('.pets__card-photo').src = dt.img;
        el.querySelector('.pets__card-caption').innerHTML=dt.name;
        //console.log(idx, dt)
      }
      i++;

    });
  }

  renderPage(1);
  renderPage(2);
  renderPage(3);
  renderPage(4);
  renderPage(5);
  renderPage(6);

})()