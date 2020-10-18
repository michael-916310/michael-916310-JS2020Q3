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
    let line = Math.round(parseFloat(getComputedStyle(sliderItems[0]).width)*8);

    if (stepDelta<0){

      if (!toLeft) {

        let kf = 1;
        let delta = stepDelta;

        if (Math.abs(delta)>=sliderItems.length){
          kf = kf + Math.floor(Math.abs(delta)/sliderItems.length);
          delta = delta % sliderItems.length;
          if (Math.abs(delta)==0) {
            delta = - sliderItems.length;
            kf= kf -1;
          }
        }

        let shift = line *kf;
        let idx = sliderItems.length+delta;

        //console.log(`idx:${idx}`, `shift:${shift}`, `delta:${delta}`,`kf:${kf}`, `stepDelta:${stepDelta}`);

        sliderItems[idx].style.left = `${-shift}px`;

      }
    }

    if (stepDelta<=0){

      if (toLeft) {
        let maxShift=0;

        sliderItems.forEach((item)=>{
          let j = parseInt(item.style.left);
          if (j<maxShift) {
            maxShift=j;
          }
        });

        let minIndex=sliderItems.length;
        sliderItems.forEach((item, idx)=>{
          let j = parseInt(item.style.left);
          if (j==maxShift) {
            if (idx<minIndex) {
              minIndex = idx;
            }
          }
        });

        let shift=-parseInt(sliderItems[minIndex].style.left)-line;

        console.log(`maxShift:${maxShift}`, `idx: ${minIndex}`, `shift:${shift}`);

        sliderItems[minIndex].style.left = `${-shift}px`;

      }
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