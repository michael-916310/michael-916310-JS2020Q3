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

    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ];

    const createIconHTML = (icon_name) => {
      return `<i class='material-icon'>${icon_name}</i>`;
    }

    keyLayout.forEach((key)=>{
      const keyElement = document.createElement('button');
      const isLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button'); // - нужно ли вообще?
      keyElement.classList.add('keyboard__key');

      switch (key) {

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click',()=>{
            this.props.value = this.props.value.substring(0, this.props.value.length - 1);
            this._triggerEvent('oninput');
          });

          break;

        case 'caps':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('keyboard_capslock');

            keyElement.addEventListener('click',()=>{
              this._toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--active', this.props.capsLock);
            });

            break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click',()=>{
            this.props.value += '\n';
            this._triggerEvent('oninput');
          });

          break;

      }

    });
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