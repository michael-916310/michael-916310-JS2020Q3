(function(){

  let elNumbers, elOperations, elClearBtns, elDecimalBtn, elResult, elDisplay;

  let memoryCurrentNumber = 0;
  let memoryNewNumber = false;
  let memoryPendingOperation = '';

  function connectToHTML(){
    elNumbers = document.querySelectorAll('.number');
    elOperations = document.querySelectorAll('.operator');
    elClearBtns = document.querySelectorAll('.clear-btn');
    elDecimalBtn = document.getElementById('decimal');
    elResult = document.getElementById('result');
    elDisplay = document.getElementById('display');

    for (let i = 0; i < elNumbers.length; i++) {
      let number = elNumbers[i];
      number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
      });
    }

    for (let i = 0; i < elOperations.length; i++) {
      let operationBtn = elOperations[i];
      if (operationBtn.innerHTML=='SIGN') {
        operationBtn.addEventListener('click', function (e) {
          elDisplay.value = (elDisplay.value>=0)?`-${elDisplay.value}`:elDisplay.value.substr(1);})
      } else {
        operationBtn.addEventListener('click', function (e) {
          operationPress(e.target.textContent);
        });
      }
    }

    for (var i = 0; i < elClearBtns.length; i++) {
      let clearBtn = elClearBtns[i];
      clearBtn.addEventListener('click', function (e) {
        clear(e.target.textContent);
      });
    }

    elDecimalBtn.addEventListener('click', decimal);
  }

  function numberPress(number) {
    if (memoryNewNumber) {
      display.value = number;
      memoryNewNumber = false;
    } else {
      if (display.value === '0') {
        display.value = number;
      } else {
        display.value += number;
      }
    }
  }

  function operationPress(op) {
    let localOperationMemory = display.value;

    if (memoryNewNumber) {
      if (memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
        memoryPendingOperation = op;
      }
    } else {
      memoryNewNumber = true;
      if (memoryPendingOperation === '+') {
        memoryCurrentNumber += +localOperationMemory;
      } else if (memoryPendingOperation === '-') {
        memoryCurrentNumber -= +localOperationMemory;
      } else if (memoryPendingOperation === '*') {
        memoryCurrentNumber *= +localOperationMemory;
      } else if (memoryPendingOperation === '/') {
        memoryCurrentNumber /= +localOperationMemory;
      } else if (memoryPendingOperation === '**') {
        memoryCurrentNumber = memoryCurrentNumber ** localOperationMemory;
      } else if (memoryPendingOperation === String.fromCharCode(8730)) {
        if (memoryCurrentNumber<0) {
          alert("Квадратный корень из отрицательного числа не допустим");
          memoryCurrentNumber=0;
        } else
          memoryCurrentNumber = localOperationMemory ** 0.5;
      } else if (memoryPendingOperation === '=') {

      } else {
        memoryCurrentNumber = +localOperationMemory;
      }
      display.value = memoryCurrentNumber;
      memoryPendingOperation = op;
    }

    if (memoryPendingOperation === '=') {
      memoryPendingOperation = '';
    }
    if (memoryPendingOperation === String.fromCharCode(8730)){
      memoryNewNumber = false;
    }

  }

  function decimal(argument) {
    let localDecimalMemory = display.value;

    if (memoryNewNumber) {
      localDecimalMemory = '0.';
      memoryNewNumber = false;
    } else {
      if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
      }
    }
    display.value = localDecimalMemory;
  }

  function clear(id) {
    if (id === 'ce') {
      display.value = '0';
      memoryNewNumber = true;
    } else if (id === 'c') {
      display.value = '0';
      memoryNewNumber = true;
      memoryCurrentNumber = 0;
      memoryPendingOperation = '';
    }
  }

  connectToHTML();
})();