export const gameObj = {

  DOMElm:{
    rootElm: document.querySelector('#root'),
    bestResultContainer: null,
  },

  bestResultArr:[
    {steps: 120, duration: 120},
    {steps: 45, duration: 220},
    {steps: 150, duration: 420},
    {steps: 10, duration: 20},
  ],

  updateDOMElmList(){
    this.DOMElm.bestResultContainer = document.querySelector('.best-result-container');
  },

  init(){

  },

};

//gameObj.init();