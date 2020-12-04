import {
  SUMMARY_LOADED,
  IS_ABSOLUTE_CHANGED,
  IS_ALL_PERIOD_CHANGED,
  IS_ASCENDING_CHANGED,
  POPULATION_LOADED,
  COUNTRY_LIST_INDICATOR_CHANGED,
  COUNTRY_SELECTED,
  CHART_FROM_CHANGED,
  CHART_TILL_CHANGED,
  CHART_DATA_FOR_WORLD_LOADED,
} from './consts';

// все функции имеют постфикс AC - от action creator
export function summaryLoadedAC(payload){
  return {
    type: SUMMARY_LOADED,
    payload: payload,
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

export function populationLoadedAC(payload){
  return {
    type: POPULATION_LOADED,
    payload,
  }
}

export function countryListIndicatorChangedAC(payload){
  return {
    type: COUNTRY_LIST_INDICATOR_CHANGED,
    payload,
  }
}

export function countrySelectedAC(payload) {
  return {
    type: COUNTRY_SELECTED,
    payload,
  }
}

export function chartDateFromChangedAC(payload){
  return {
    type: CHART_FROM_CHANGED,
    payload,
  }
}

export function chartDateTillChangedAC(payload){
  return {
    type: CHART_TILL_CHANGED,
    payload,
  }
}

export function chartDataForWorldLoadedAC(payload){
  return {
    type: CHART_DATA_FOR_WORLD_LOADED,
    payload,
  }
}