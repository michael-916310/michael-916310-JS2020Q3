"use strict";

!(function(strBtnContainerClassName, strResultId, strLogId){

  let inputResult;
  let inputLog;

  let state = {
    curInteger: '0',
    curfloat: '',
    sing: '',
    isFloatInput: false,

    operation:'',
    calcLog:[],



    addNumber: (x)=>{
      if (state.isFloatInput) {
        state.curfloat = '' + state.curfloat + x;
      } else {
        state.curInteger = '' + state.curInteger + x;
        state.curInteger = `${parseInt(state.curInteger)}`
      }
    },

    backStep: ()=>{
      let a=[];

      if (state.isFloatInput) {
        if (state.curfloat.length==0) {
          state.isFloatInput = false;
        } else {
          a = state.curfloat.split('');
          a.pop();
          state.curfloat = a.join('');
        }
      } else {
        a = state.curInteger.split('');
        a.pop();
        state.curInteger = a.join('');
      }
    },

    getCurrent: ()=>{
      return (state.isFloatInput)? `${state.sing}${state.curInteger}.${state.curfloat}`: `${state.sing}${state.curInteger}`;
    },

    setCurrent(v) {
      if (v[0] == '-') {
        this.sing = '-';
      } else {
        this.sing = '';
      }

      this.curInteger = `${parseInt(v)}`;
      this.curfloat = `${(parseFloat(v) - parseInt(v)).toFixed(6)}`;
      if (this.curfloat.includes('.')) {
        this.curfloat= this.curfloat.substr(this.curfloat.indexOf('.')+1);
      }

      if (Number(this.curfloat)==0) {
        this.isFloatInput = false;
      } else {
        this.isFloatInput = true;
      }
    },

    clearCurrent(){
      this.curInteger="0";
      this.curfloat='';
      this.isFloatInput=false;
    },

    calculate(v){
      if (this.calcLog.length==3) {

        let rt = ''+eval(this.calcLog.join(''));

        this.calcLog.length = 0;
        if (!(v=='=')) {
          this.calcLog.push(rt);
        }

        this.setCurrent(rt);
      }
    },

  }

  function connectToHTML(){
    let elButtonsContainer;

    elButtonsContainer=document.getElementsByClassName(strBtnContainerClassName)[0];
    elButtonsContainer.addEventListener('click', onBtnClick);

    inputResult = document.getElementById(strResultId);
    inputLog = document.getElementById(strLogId);
  }

  function refresh(){
    inputResult.value =  state.getCurrent();
  }

  function onBtnClick(e) {
    if (e.target.type=='button'){

      let v = e.target.textContent;
      switch (v) {
        case 'ce':
          state.clearCurrent();
          state.operation = "";
          break;
        case 'c':
          state.calcLog.length = 0;
          state.clearCurrent();
          state.operation = "";
          break;
        case String.fromCharCode(8656):
          // стрелка "назад" - стереть значение
          state.backStep();
          state.operation = "";
          break;
        case String.fromCharCode(8730):
          // квадратный корень
          v = '**(1/2)';

          if (state.operation!=='**(1/2)'){
            state.calcLog.push(state.getCurrent());
          }

          state.operation = v;

          state.calculate(v);

          state.calcLog.push('**');
          state.calcLog.push('0.5');
          state.calculate(v);

          break;
        case '/':
        case '*':
        case '-':
        case '+':
        case '=':
        case '**':
          if (state.operation !=='**(1/2)'){
            state.calcLog.push(state.getCurrent());
            state.calculate(v);
          }

          state.operation = v;
          if (!(v=='=')) {
            state.calcLog.push(v);
          }

          break;
        case '.':
          if (!state.isFloatInput){
            state.isFloatInput = true;
          }
          state.operation = "";
          break;
        default:
          if (parseInt(v)>=0 || parseInt(v)<=9) {
            if (state.operation == '') {
              state.addNumber(v);
            } else {
              state.clearCurrent();
              state.addNumber(v);
            }
          }
          state.operation = "";
      }

      console.log(state.calcLog, state.getCurrent());

      refresh();
    }
  }

  connectToHTML();
  refresh();

})('calc-buttons','display','input-log')
