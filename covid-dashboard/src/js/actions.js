import {SUMMARY_LOADED, IS_ABSOLUTE_CHANGED, IS_ALL_PERIOD_CHANGED, IS_ASCENDING_CHANGED} from './consts';

// все функции имеют постфикс AC - от action creator
export function summaryLoadedAC(payload){
  return {
    type: SUMMARY_LOADED,
    payload:payload,
  }
}

export function switcherChangedAC(switcher,payload){
  let type;
  if (switcher==='isAbsolute') {
    type = IS_ABSOLUTE_CHANGED;
  } else if (switcher==='isAllPeriod') {
    type = IS_ALL_PERIOD_CHANGED;
  } else if (switcher==='isAscending') {
    type = IS_ASCENDING_CHANGED;
  }
  return {
    type,
    payload,
  }
}

