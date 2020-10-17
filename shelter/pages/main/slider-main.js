function addSlider(petsJson){

  let petsArr = [...petsJson];
  let petsArrOnSlider =[];
  let petsArrToSelect =[];

  let curToLeft=0;

  let sliderItems = [...document.querySelectorAll('.pets-slider__card')];

  function countCardsOnSlider(){
    // return [...document.querySelectorAll('.pets-slider__card')].filter((item)=>{
    //   if (getComputedStyle(item).display=='none') {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }).length;

    return 3;
  }

  function updateArrToSelect(){
    petsArrToSelect = petsArr.filter((item)=>{
      return !petsArrOnSlider.includes(item);
    });
  }

  function toLeft(){

    let itemsWidth = sliderItems.reduce((pv, v)=>{
      return pv+parseFloat(getComputedStyle(v).width);
    },0)

    let toLeft = (parseFloat(getComputedStyle(document.querySelector('.pets-slider')).width) - itemsWidth)/4+itemsWidth/3;
    curToLeft += toLeft;

    sliderItems.forEach(element => {
      //element.classList.add('slider-to-left');
      element.style.transform = 'translateX(-' + curToLeft + 'px)'
    });
  }


  function init(){
    let cnt = countCardsOnSlider();

    // сгенерируем кого будем отображать
    for (i=0; i<cnt; i++){
      petsArrOnSlider.push(petsArr[Math.floor(Math.random() * petsArr.length)]);
    };

    updateArrToSelect();

    document.querySelector('.pets-slider__left-arrow').addEventListener('click', toLeft)
  }

  init();

  //console.log(petsArr, petsArrOnSlider, petsArrToSelect);
}

addSlider(petsJson);