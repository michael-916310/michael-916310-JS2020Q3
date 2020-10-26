const Keyboard = {

  keyLayoutENG: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
    "done", "EN-RU", "space", "keyboard_arrow_left", "keyboard_arrow_right", 'volume_up'
  ],

  keyLayoutENGShift: [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "enter",
    "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
    "done", "EN-RU", "space", "keyboard_arrow_left", "keyboard_arrow_right", 'volume_up'
  ],

  keyLayoutRU: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
    "done", "EN-RU", "space", "keyboard_arrow_left", "keyboard_arrow_right", 'volume_up'
  ],

  keyLayoutRUShift: [
    "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
    "й", "ц", "у", "к", "у", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
    "done", "EN-RU", "space", "keyboard_arrow_left", "keyboard_arrow_right", 'volume_up'
  ],


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
    shift: false,
    sounds: true,
    lang: {
      ENG: true,
      RU: false,

      getBtnText(){
        return `<span>${this.ENG ? 'ENG ru': 'RU eng'}</span>`;
      },
    },
  },

  elementWithText: {
    selectionStart: null,
    setSelectionRange: null,
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
          (curV, cursorPosition=0)=>{
            el.value = curV;
            el.setSelectionRange(cursorPosition, cursorPosition);
            el.focus();
          },
          null,
          ()=>{return el.selectionStart},
          (cursorPosition)=>{
            el.setSelectionRange(cursorPosition, cursorPosition);
            el.focus();
          },
        );
      })

      // При вводе с клавиатуры запишем вводимые символы в this.props.value
      el.addEventListener('input', (e)=>{
        this.props.value = el.value;
        //console.log(this.props.value);
      });

      // Добавим обработку нажатия клавиш на клавиатуре
      el.addEventListener('keydown', (e)=>{
        if (!e.repeat){
          this._handleKeyDown(e.key);
        }
      });
    });

  },

  _handleKeyDown(keyPressed){
    let keyP = keyPressed.toLowerCase();

    for (const key of this.elements.keys) {
      if (key.dataset.key===keyP) {

        console.log(key, keyP );

        switch (keyP) {
          case 'backspace':
            this._playSound('backspace.mp3');
            break;
          case 'capslock':
            this._toggleCapsLock();
            key.classList.toggle('keyboard__key--active', this.props.capsLock);
            this._playSound('caps.wav');
            break;
          case 'shift':
            this._toggleShift();
            key.classList.toggle('keyboard__key--active', this.props.shift);
            this._playSound('shift.mp3');
            break;
          case 'enter':
            this._playSound('enter.mp3');
            break;
          case ' ':
            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
            break;
          case 'arrowleft':
            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
            break;
          case 'arrowright':
            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
            break;
          default:
            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
            break;
        }

        key.classList.add('keyboard__key_animation');
        key.addEventListener('animationend', ()=>{key.classList.remove('keyboard__key_animation')});
      }
    }
  },

  _playSound(fileName){
    if (this.props.sounds){
      let audio = new Audio();
      //audio.src = `./sounds/${fileName}`;
      audio.src = `./${fileName}`;
      audio.autoplay = true;
    }
  },

  _createKeys(){

    const fragment = document.createDocumentFragment();

    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    }

    this.keyLayoutENG.forEach((key, idx)=>{
      const keyElement = document.createElement('button');
      const isLineBreak = ["backspace", "]", "enter", "/"].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button'); // - нужно ли вообще?
      keyElement.classList.add('keyboard__key');

      switch (key) {

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.setAttribute('data-key', 'backspace');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();
            const left = this.props.value.slice(0, cursorPos);
            const right = this.props.value.slice(cursorPos);

            if (left.length && cursorPos) {
              this.props.value = `${left.substring(0, left.length - 1)}${right}`;
              this._triggerEvent('oninput', cursorPos-1);
            } else {
              this.elementWithText.setSelectionRange(0);
            }
            this._playSound('backspace.mp3');
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.setAttribute('data-key', 'capslock');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();

            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.props.capsLock);
            this.elementWithText.setSelectionRange(cursorPos);
            this._playSound('caps.wav');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.setAttribute('data-key', 'shift');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();

            this._toggleShift();
            keyElement.classList.toggle('keyboard__key--active', this.props.shift);
            this.elementWithText.setSelectionRange(cursorPos);

            this._playSound('shift.mp3');
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.setAttribute('data-key', 'enter');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();
            const left = this.props.value.slice(0, cursorPos);
            const right = this.props.value.slice(cursorPos);

            //this.props.value += '\n';
            this.props.value = `${left}\n${right}`;
            this._triggerEvent('oninput', cursorPos+1);
            this._playSound('enter.mp3');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.setAttribute('data-key', ' ');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();
            const left = this.props.value.slice(0, cursorPos);
            const right = this.props.value.slice(cursorPos);

            this.props.value = `${left} ${right}`;

            this._triggerEvent('oninput', cursorPos+1);
            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('keyboard_hide');

          keyElement.addEventListener('click',()=>{
            this.close();
            this._triggerEvent('onclose');
          });

          break;

        case 'EN-RU':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = this.props.lang.getBtnText();

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();

            this._toggleLang();
            this.elementWithText.setSelectionRange(cursorPos);

            keyElement.innerHTML = this.props.lang.getBtnText();
          });

          break;

        case 'volume_up':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('volume_up');
          keyElement.classList.toggle('keyboard__key--active', this.props.sounds);

          keyElement.addEventListener('click',()=>{
            let cursorPos = this.elementWithText.selectionStart();

            this.props.sounds=!this.props.sounds;
            keyElement.classList.toggle('keyboard__key--active', this.props.sounds);
            this.elementWithText.setSelectionRange(cursorPos);

            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
          });

          break;

        case 'keyboard_arrow_left':
          keyElement.setAttribute('data-key', 'arrowleft');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

          keyElement.addEventListener('click',()=>{
            if (this.elementWithText.selectionStart && this.elementWithText.setSelectionRange) {
              let cursorPos = this.elementWithText.selectionStart();
              cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
              this.elementWithText.setSelectionRange(cursorPos);
              this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
            }
          });

          break;

        case 'keyboard_arrow_right':
          keyElement.setAttribute('data-key', 'arrowright');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');

          keyElement.addEventListener('click',()=>{
            if (this.elementWithText.selectionStart && this.elementWithText.setSelectionRange) {
              let cursorPos = this.elementWithText.selectionStart();
              cursorPos += 1;
              this.elementWithText.setSelectionRange(cursorPos);
              this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
            }
          });
          break;

        default:
          keyElement.textContent = key.toLocaleLowerCase();
          keyElement.setAttribute('data-btn-type', 'keyButton');
          keyElement.setAttribute('data-arr-index', idx);
          keyElement.setAttribute('data-key', keyElement.textContent);

          keyElement.addEventListener('click',(e)=>{
            let cursorPos = this.elementWithText.selectionStart();
            const left = this.props.value.slice(0, cursorPos);
            const right = this.props.value.slice(cursorPos);

            let symbol = '';
            if ((this.props.capsLock && this.props.shift) || (!this.props.capsLock && !this.props.shift)) {
              symbol =  keyElement.textContent.toLowerCase();
            } else {
              symbol = keyElement.textContent.toUpperCase();
            }
            this.props.value = `${left}${symbol}${right}`;

            cursorPos += 1;
            this._triggerEvent('oninput', cursorPos);

            this._playSound(this.props.lang.ENG ?'keyENG.mp3':'keyRU.mp3');
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

  _triggerEvent(handleName, cursorPos){
    if (typeof this.eventsHandlers[handleName] == 'function') {
      this.eventsHandlers[handleName](this.props.value, cursorPos);
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

  _updateBtnText(){
    for (const key of this.elements.keys) {
      if (key.dataset.btnType === "keyButton" ) {
        let v = '';
        let idx = +key.dataset.arrIndex;
        if (this.props.lang.RU ){
          if (this.props.shift) {
            v = this.keyLayoutRUShift[idx];
          } else {
            v = this.keyLayoutRU[idx];
          }
        } else {
          if (this.props.shift) {
            v = this.keyLayoutENGShift[idx];
          } else {
            v = this.keyLayoutENG[idx];
          }
        }
        //console.log(key.textContent, idx, v);
        key.textContent = this.props.capsLock ? v.toUpperCase() : v.toLowerCase();
        key.setAttribute('data-key', key.textContent.toLowerCase());
      }
    }
  },

  _toggleShift(){
    this.props.shift = ! this.props.shift;

    this._updateBtnText();
  },

  _toggleLang(){
    this.props.lang.ENG = ! this.props.lang.ENG;
    this.props.lang.RU = ! this.props.lang.RU;

    this._updateBtnText();
  },

  open(initialValue,  oninput, onclose, selectionStart, setSelectionRange){
    this.props.value = initialValue || '';
    this.eventsHandlers.oninput = oninput;
    this.eventsHandlers.onclose = onclose;

    this.elementWithText.selectionStart = selectionStart;
    this.elementWithText.setSelectionRange = setSelectionRange;

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
})