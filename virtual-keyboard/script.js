const Keyboard = {

  elements: {
    main: null,
    keysContainer: null,
    keys:[],
  },

  eventsHandlers:{
    oninput: null,
    onclose: null,
  },

  props: {
    value: '',
    capsLock: false,
  },

  init(){

    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', '1keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

  },

  _createKeys(){

  },

  _triggerEvent(handleName){
    console.log(`Event triggered ${handleName}`);
  },

  _toggleCapsLock(){
    console.log(`caps lock pressed`);
  },

  open(initialValue, oninput, onclose){

  },

  close(){

  }

}

window.addEventListener("DOMContentLoaded", ()=>{
  Keyboard.init();
})