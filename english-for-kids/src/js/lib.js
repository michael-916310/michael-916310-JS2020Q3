import {categoryData} from './gameData';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomItems(currentCategoryId){
  let rt=[];
  const source = categoryData.get(currentCategoryId)
  if (source){
    let rest = [];
    for (let i=0; i<source.length; i++ ){
      rest[i]=i;
    }

    while (rt.length<source.length) {
      const cur = getRandomInt(0, rest.length);
      if (rt.filter((r)=>{ return (r===rest[cur]); }).length===0) {
        rt.push(rest[cur]);
        rest = rest.filter((el,idx,arr)=>{
          return (el!==arr[cur])
        });
      }
    }

  }
  return rt;
}

export function fn(){

}


