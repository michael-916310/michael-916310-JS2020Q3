function addSlider(petsJson){

  let petsArr = [...petsJson];
  let petsArrOnSlider =[];
  let petsArrToSelect =[];

  let curToLeft=0;

  let sliderItems = [...document.querySelectorAll('.pets-slider__card')];

  function getVisibleSliderItems(){
    return sliderItems.filter((item)=>{
      if (getComputedStyle(item).display=='none') {
        return false;
      } else {
        return true;
      }
    });
  }

  function updateArrToSelect(){
    petsArrToSelect = petsArr.filter((item)=>{
      return !petsArrOnSlider.includes(item);
    });
  }

  function getSlidersWidth(){
    return getVisibleSliderItems().reduce((pv, v)=>{
      return pv+parseFloat(getComputedStyle(v).width);
    },0)
  }

  function getSlideShift(){
    let itemsWidth = getSlidersWidth();
    let itemsCount = getVisibleSliderItems().length;
    let sliderWidth = parseFloat(getComputedStyle(document.querySelector('.pets-slider')).width);

    return (sliderWidth - itemsWidth)/(itemsCount+1)+itemsWidth/itemsCount;
  }

  function toLeft(){

    let toLeft = getSlideShift();
    curToLeft += toLeft;

    sliderItems.forEach(element => {
      element.style.transform = 'translateX(-' + curToLeft + 'px)'
    });

  }


  function init(){
    let cnt = getVisibleSliderItems().length;

    console.log(cnt);

    // сгенерируем кого будем отображать
    for (i=0; i<cnt; i++){
      petsArrOnSlider.push(petsArr[Math.floor(Math.random() * petsArr.length)]);
    };

    updateArrToSelect();

    // привяжим обработчики кликов
    document.querySelector('.pets-slider__left-arrow').addEventListener('click', toLeft)
  }

  init();

  //console.log(petsArr, petsArrOnSlider, petsArrToSelect);
}

addSlider(petsJson);