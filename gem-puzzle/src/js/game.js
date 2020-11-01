
export const gameObj = {

  config: {
    areaSize: 4,
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
    areaSizeElm: null,
  },

  bestResultArr:[],

  updateDOMElmList(){
    this.DOMElm.bestResultContainer = document.querySelector('.best-result-container');
    this.DOMElm.gameArea = document.querySelector('.game-area');
    this.DOMElm.gameSteps = document.querySelector('.game-steps');
    this.DOMElm.gameDuration = document.querySelector('.game-duration');
    this.DOMElm.soundElm = document.querySelector('#config__sounds_chkbox_id');
    this.DOMElm.areaSizeElm = document.querySelector('#config__area-size_id');
  },

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  restartGame(fnRenderGameResult){
    this.stepsCount=0;
    this.loadResults();
    this.generateDominoArr();
    this.restartDuration(fnRenderGameResult);
  },

  stopGame(){
    this.stepsCount=0;
    this.gameDuration =0;

    if (this.config.durationIntervalId) {
      clearInterval(this.config.durationIntervalId);
    }
  },

  restartDuration(fnRenderGameResult){

    if (this.config.durationIntervalId) {
      clearInterval(this.config.durationIntervalId);
      this.config.durationIntervalId = null;
      this.gameDuration =0;
    }
    this.config.durationIntervalId = setInterval(()=>{
      this.gameDuration++;
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
  },

  isGameFinished(){
    return this.dominoArr.every((item, idx, arr)=>{

      if (idx==0) {
        if (item.num==1) {
          return true;
        }
        return false;
      }
      if (idx == (arr.length-1) ) {
        if (item.num==0) {
        return true;
        }
        return false;
      }
      if (item.num == (arr[idx-1].num+1)) {
        return true;
      }
      return false;
    });
  },

  addResultToList(){
    if (this.isGameFinished()) {
      let lst = JSON.parse(localStorage.gameList) || [];
      lst.push({
        areaSize: this.config.areaSize,
        duration: this.gameDuration,
        stepsCount: this.stepsCount,
      })
      localStorage.gameList = JSON.stringify(lst);
    }
  },

  loadResults(){
    let lst = JSON.parse(localStorage.gameList || JSON.stringify('[]'));

    lst.sort((a,b)=>{
      return (a.stepsCount - b.stepsCount);
    });

    this.bestResultArr = [];
    lst.forEach((el)=>{
      if (this.bestResultArr.length<10) {
        this.bestResultArr.push(el);
      }

    })
  },

  saveCurrentGame(){
    let g = {
      config: {
        areaSize: this.config.areaSize,
        isSound: this.config.isSound,
      },
      gameDuration: this.gameDuration,
      stepsCount: this.stepsCount,
      dominoArr: this.dominoArr,
    }

    localStorage.savedGame = JSON.stringify(g);
  },

  loadCurrentGame(){
    let g = JSON.parse(localStorage.savedGame || JSON.stringify('{}'));

    this.config.areaSize = g.config.areaSize;
    this.config.isSound = g.config.isSound;
    this.gameDuration = g.gameDuration;
    this.stepsCount = g.stepsCount;
    this.dominoArr = g.dominoArr;
  },

};
