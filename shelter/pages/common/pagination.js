(function(){
  let dataArr = [];         // этот массив отрисовываем

  let visibleCardList = []; // массов видимых элементов

  let perPage = 0;          // сколько элементов видно на странице за раз
  let pagesTotal = 0;       // сколкьо всего страниц

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


})()