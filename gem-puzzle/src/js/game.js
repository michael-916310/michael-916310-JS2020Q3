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

  init(){
    for (let i=0; i<this.config.areaSize; i++){
      for (let j=0; j<this.config.areaSize; j++){
        this.dominoArr.push({
          num: this.config.areaSize*i+j,
          isEmpty: (i+j===0)?true:false,
        });
      }
    }

  },

};

gameObj.init();