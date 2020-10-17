function addSlider(petsJson){

  let petsArr = [...petsJson];
  let petsArrOnSlider =[];
  let petsArrToSelect =[];

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

  function init(){
    let cnt = countCardsOnSlider();

    // сгенерируем кого будем отображать
    for (i=0; i<cnt; i++){
      petsArrOnSlider.push(petsArr[Math.floor(Math.random() * petsArr.length)]);
    };

    updateArrToSelect();

  }

  init();

  console.log(petsArr, petsArrOnSlider, petsArrToSelect);
}

addSlider(petsJson);