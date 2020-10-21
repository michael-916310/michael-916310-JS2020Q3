(function(){
  let dataArr = [];         // этот массив отрисовываем

  let visibleCardList = []; // массов видимых элементов

  let perPage = 0;          // сколько элементов видно на странице за раз
  let pagesTotal = 0;       // сколкьо всего страниц
  let curPage = 1;          // текущая страница

  let leftAllBtn = document.querySelector('.pets-slider__left-all');
  let leftBtn = document.querySelector('.pets-slider__left-step');
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
      }
    })

    rightAllBtn.addEventListener('click', ()=>{
      if (curPage<pagesTotal){
        curPage=pagesTotal;
        renderPage();
      }
    })

    leftBtn.addEventListener('click', ()=>{
      if (curPage>=2){
        curPage--;
        renderPage();
      }
    })

    leftAllBtn.addEventListener('click', ()=>{
      curPage=1;
      renderPage();
    })

    document.querySelector('.pets-container').addEventListener('transitionend', ()=>{
      document.querySelector('.pets-container').classList.remove('pets-container-fadeOut');
    });

  })();

  function setBtnState(){
    curPageBtn.innerHTML = curPage;

    rightBtn.classList.add('pets-slider__active');
    rightAllBtn.classList.add('pets-slider__active');
    leftBtn.classList.add('pets-slider__active');
    leftAllBtn.classList.add('pets-slider__active');

    rightBtn.classList.remove('pets-slider__inactive');
    rightAllBtn.classList.remove('pets-slider__inactive');
    leftBtn.classList.remove('pets-slider__inactive');
    leftAllBtn.classList.remove('pets-slider__inactive');

    if (curPage==pagesTotal){
      rightBtn.classList.remove('pets-slider__active');
      rightBtn.classList.add('pets-slider__inactive');

      rightAllBtn.classList.remove('pets-slider__active');
      rightAllBtn.classList.add('pets-slider__inactive');
    } else if (curPage==1) {
      leftBtn.classList.remove('pets-slider__active');
      leftBtn.classList.add('pets-slider__inactive');

      leftAllBtn.classList.remove('pets-slider__active');
      leftAllBtn.classList.add('pets-slider__inactive');
    }
  }

  function renderPage(){
    let i=0;

    document.querySelector('.pets-container').classList.add('pets-container-fadeOut')



    visibleCardList.forEach((el)=>{

      let idx = (curPage-1)*perPage+i;
      if (idx<dataArr.length){
        let dt = petsDataArray[dataArr[idx]];

        el.querySelector('.pets__card-photo').src = dt.img;
        el.querySelector('.pets__card-caption').innerHTML=dt.name;
      }
      i++;

    });
    setBtnState();
  }

  renderPage(1);

})()