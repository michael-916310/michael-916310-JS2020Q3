const INFO_LABEL_ELM = document.querySelector('.all-page-header__info-label');

function setHeaderLabel(v){
  INFO_LABEL_ELM.innerHTML = v;
}


export {setHeaderLabel}