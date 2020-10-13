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

    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach((el)=>{
      el.addEventListener('focus', ()=>{
        this.open(
          el.value,
          (curV)=>{ el.value = curV; }
        );
      })
    });
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
      return `<i class="material-icons">${icon_name}</i>`;
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

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click',()=>{
            this.props.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click',()=>{
            this.close();
            this._triggerEvent('onclose');
          });

          break;

        default:
          keyElement.textContent = key.toLocaleLowerCase();

          keyElement.addEventListener('click',()=>{
            this.props.value += this.props.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (isLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }

    });

    return fragment;

  },

  _triggerEvent(handleName){
    if (typeof this.eventsHandlers[handleName] == 'function') {
      this.eventsHandlers[handleName](this.props.value);
    }
  },

  _toggleCapsLock(){
    this.props.capsLock = ! this.props.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 ) {
        key.textContent = this.props.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }

    }
  },

  open(initialValue, oninput, onclose){
    this.props.value = initialValue || '';
    this.eventsHandlers.oninput = oninput;
    this.eventsHandlers.onclose = onclose;

    this.elements.main.classList.remove('keyboard--hidden');
  },

  close(){
    this.props.value = '';
    this.eventsHandlers.oninput = null;
    this.eventsHandlers.onclose = null;

    this.elements.main.classList.add('keyboard--hidden');
  }

}

window.addEventListener("DOMContentLoaded", ()=>{
  Keyboard.init();
  // Keyboard.open('dcode',
  //   (curValue)=>{
  //     console.log('changed value: '+curValue);
  //   },
  //   (curValue) => {
  //     console.log('closed with: '+curValue);
  //   }
  // );
})