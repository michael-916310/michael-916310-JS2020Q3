export function dateToYYYYMMDD(dt){
  let m = dt.getMonth()+1;
  m = (m<10) ? `0${m}`: `${m}`;

  let d = dt.getDate();
  d = (d<10) ? `0${d}`: `${d}`;

  return `${dt.getFullYear()}-${m}-${d}`;
}

export function dateToMMDDYYYY(dt){
  let m = dt.getMonth()+1;
  m = (m<10) ? `0${m}`: `${m}`;

  let d = dt.getDate();
  d = (d<10) ? `0${d}`: `${d}`;

  return `${m}-${d}-${dt.getFullYear()}`;
}