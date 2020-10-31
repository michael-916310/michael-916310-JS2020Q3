
export const gameObj = {

  config: {
    areaSize: 3,
    durationIntervalId: null,
    isSound: false,
  },

  dominoArr:[],
  stepsCount:0,
  gameDuration:0,

  DOMElm:{
    rootElm: document.querySelector('#root'),
    gameSteps: null,
    gameDuration: null,
    bestResultContainer: null,
    gameArea: null,
    dominoElmArr: null,
    soundElm: false,
  },

  bestResultArr:[
    {steps: 120, duration: 120},
    {steps: 45, duration: 220},
    {steps: 150, duration: 420},
    {steps: 10, duration: 20},
  ],

  updateDOMElmList(){
    this.DOMElm.bestResultContainer = document.querySelector('.best-result-container');
    this.DOMElm.gameArea = document.querySelector('.game-area');
    this.DOMElm.gameSteps = document.querySelector('.game-steps');
    this.DOMElm.gameDuration = document.querySelector('.game-duration');
    this.DOMElm.soundElm = document.querySelector('#config__sounds_chkbox_id');
  },

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  restartGame(fnRenderGameResult){
    this.stepsCount=0;
    this.generateDominoArr();
    this.restartDuration(fnRenderGameResult);
  },

  restartDuration(fnRenderGameResult){

    if (this.config.durationIntervalId) {
      clearInterval(this.config.durationIntervalId);
      this.config.durationIntervalId = null;
      this.gameDuration =0;
    }
    this.config.durationIntervalId = setInterval(()=>{
      this.gameDuration++;
      //console.log(`this.gameDuration:${this.gameDuration} this.stepsCount:${this.stepsCount}`);
      if (fnRenderGameResult){
        fnRenderGameResult();
      }
    }, 1000)

  },

  generateDominoArr(){
    let dominoNum = Math.pow(this.config.areaSize,2);
    this.dominoArr = [];

    while (this.dominoArr.length<dominoNum){
      let rnd = this._getRandomInt(0, dominoNum-1);
      if (
        this.dominoArr.filter((item)=>{
          return (item.num === rnd)
        }).length == 0
      ) {
        this.dominoArr.push({num:rnd, isEmpty: (rnd==0)?true:false});
      }
    }
    //console.log(`generateDominoArr complete`);
  },

  moveDomino(idx, fnRefreshLayout){
    if (idx<this.dominoArr.length){

      let next = -1, translate='';

      // ячейка вниз
      if ((idx + this.config.areaSize) < this.dominoArr.length){
        if (this.dominoArr[idx + this.config.areaSize].isEmpty) {
          next = idx + this.config.areaSize;
          translate = 'transform: translateY(100%)'
        }
      }
      // ячейка вверх
      if ((idx - this.config.areaSize) >=0 ){
        if (this.dominoArr[idx - this.config.areaSize].isEmpty) {
          next = idx - this.config.areaSize;
          translate = 'transform: translateY(-100%)'
        }
      }
      // ячейка назад
      if ((idx - 1) >=0 ){
        if (this.dominoArr[idx - 1].isEmpty) {
          // только в рамках текущего ряда
          if ((idx % this.config.areaSize) > 0){
            next = idx - 1;
            translate = 'transform: translateX(-100%)'
          }
        }
      }
      // ячейка вперед
      if ((idx + 1)  < this.dominoArr.length){
        if (this.dominoArr[idx + 1].isEmpty) {
          // только в рамках текущего ряда
          if (((idx+1) % this.config.areaSize) > 0){
            next = idx + 1;
            translate = 'transform: translateX(100%)'
          }
        }
      }
      if (next>=0){

        this.DOMElm.dominoElmArr[idx].addEventListener('transitionend', ()=>{

          //console.log('transitionend');

          this.dominoArr[next].num = this.dominoArr[idx].num;
          this.dominoArr[next].isEmpty = false;

          this.dominoArr[idx].isEmpty = true;
          this.dominoArr[idx].num = 0;


          fnRefreshLayout()
        })

        this.playSound();
        this.stepsCount++;


        this.DOMElm.dominoElmArr[idx].style=translate;

        return true;
      }

    }
  },

  playSound(){
    if (this.config.isSound) {
      let audio = new Audio();
      audio.src = `./assets/sound.mp3`;
      audio.autoplay = true;
    }
  }

};
