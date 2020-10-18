function addSlider(petsJson){

  let petsArr = [...petsJson];
  let petsArrOnSlider =[];
  let petsArrToSelect =[];

  let curToLeft=0;

  let leftStep=0;
  let rightStep=0;

  let sliderItems = [...document.querySelectorAll('.slider-item')];



  function shiftSlide(toLeft=true){

    let shiftSize = Math.round(parseFloat(getComputedStyle(sliderItems[0]).width));
    if (toLeft) {
      curToLeft -= shiftSize;
      leftStep+=1;
    } else {
      curToLeft += shiftSize;
      rightStep+=1;
    }

    let stepDelta = leftStep-rightStep;
    if (stepDelta<0){
      let l = Math.round(parseFloat(getComputedStyle(sliderItems[0]).width)*8);
      sliderItems[sliderItems.length+stepDelta].style.left = `${-l}px`;

      console.log(sliderItems.length+stepDelta,stepDelta, rightStep);
    }

    if (stepDelta>0){

    }

    sliderItems.forEach((element, index) => {
      element.style.transform = 'translateX(' + curToLeft + 'px)'
    });

  }

  function updateArrToSelect(){
    petsArrToSelect = petsArr.filter((item)=>{
      return !petsArrOnSlider.includes(item);
    });
  }


  function init(){
    // let cnt = getVisibleSliderItems().length;

    // //console.log(cnt);

    // // сгенерируем кого будем отображать
    // for (i=0; i<cnt; i++){
    //   petsArrOnSlider.push(petsArr[Math.floor(Math.random() * petsArr.length)]);
    // };

    // updateArrToSelect();

    // привяжим обработчики кликов
    document.querySelector('.pets-slider__left-arrow').addEventListener('click', ()=>{shiftSlide(true)})
    document.querySelector('.pets-slider__right-arrow').addEventListener('click', ()=>{shiftSlide(false)})


  }

  init();

  //console.log(petsArr, petsArrOnSlider, petsArrToSelect);
}

addSlider(petsJson);