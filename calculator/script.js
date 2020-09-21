"use strict";

!(function(strBtnContainerClassName, strResultId, strLogId){

  let inputResult;
  let inputLog;

  let state = {
    curInteger: '0',
    curfloat: '',
    isFloatInput: false,
    isShowCurrent: true,

    lastNumber:'0',
    lastOperation:'',
    operationLog: [],

    addNumber: (x)=>{
      if (state.isFloatInput) {
        state.curfloat = '' + state.curfloat + x;
      } else {
        state.curInteger = '' + state.curInteger + x;
        state.curInteger = `${parseInt(state.curInteger)}`
      }
      state.operationLog.push(x);      
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
      state.operationLog.push(String.fromCharCode(8656));
    },

    getCurrent: ()=>{
      return (state.isFloatInput)? `${state.curInteger}.${state.curfloat}`: state.curInteger;
    },

    clearCurrent(){
      this.curInteger="0";
      this.curfloat='';
      this.isFloatInput=false;      
    },

    addOperation(x){
      let cur = this.getCurrent();

      if (this.lastNumber=='0') {
        this.lastNumber = cur;
        this.lastOperation = x;
        this.clearCurrent();
      } else {
        switch (x) {
          case '/':
            this.lastNumber = `${parseFloat(this.lastNumber)/parseFloat(cur)}`;
            break;
          case '*':
            ;
            break;
          case '-':
            ;
            break;
          case '+':
            ;
            break;
          case '=':
            this.addOperation(this.lastOperation);
            this.isShowCurrent = false;
            this.clearCurrent();
            break;
        }
      }
      this.operationLog.push(x);      
    }
  }

  function connectToHTML(){
    let elButtonsContainer;

    elButtonsContainer=document.getElementsByClassName(strBtnContainerClassName)[0];
    elButtonsContainer.addEventListener('click', onBtnClick);

    inputResult = document.getElementById(strResultId);
    inputLog = document.getElementById(strLogId);
  }

  function refresh(){
    if (state.isShowCurrent) {
      inputResult.value =  state.getCurrent();
    } else {
      inputResult.value =  state.lastNumber;
    }
    inputLog.innerHTML = state.operationLog.join('');
  }

  function onBtnClick(e) {
    if (e.target.type=='button'){

      let v = e.target.textContent;
      switch (v) {
        case 'ce':
          state.clearCurrent();
          state.operationLog.push(v);          
          break;
        case 'c':

          break;
        case String.fromCharCode(8656):
          // стрелка "назад" - стереть значение
          state.backStep();
          break;
        case '/':
        case '*':
        case '-':
        case '+':
        case '=':
          state.addOperation(v);
          break;
        case '.':
          if (!state.isFloatInput){
            state.isFloatInput = true;            
            state.operationLog.push(v);
          }
          break;
        default:
          if (parseInt(v)>=0 || parseInt(v)<=9) {
            state.addNumber(v);
          }
      }
      refresh();
    }
  }

  connectToHTML();
  refresh();
  
})('calc-buttons','display','input-log')