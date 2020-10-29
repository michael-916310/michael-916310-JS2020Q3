export const gameObj = {

  config: {
    areaSize: 8,
  },

  dominoArr:[],

  DOMElm:{
    rootElm: document.querySelector('#root'),
    bestResultContainer: null,
    gameArea: null,
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
  },

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

    //console.log(this.dominoArr[0].num, this.dominoArr[1].num, this.dominoArr[2].num);
  },

  init(){
    this.generateDominoArr();
  },

};

gameObj.init();