import {SUMMARY_LOADED} from './consts';

// все функции имеют постфикс AC - от action creator
export function summaryLoadedAC(payload){
  return {
    type: SUMMARY_LOADED,
    payload:payload,
  }
}

