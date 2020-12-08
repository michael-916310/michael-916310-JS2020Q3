import * as L from 'leaflet';
import mapWorldCounty from './mapCountries';

const mapboxAccessToken = 'pk.eyJ1IjoibWljaGFlbDkxNjMxMCIsImEiOiJja2lmeHFuNWswaXQxMnNxazFpcWxpN3ZzIn0.QodWnu0mJ06VgvFkow7d_Q';
const map = L.map('mapid').setView([37.8, 96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);


function getColor(d) {
  return d > 10000000 ? '#800026' :
         d > 5000000 ? '#BD0026' :
         d > 2500000  ? '#E31A1C' :
         d > 1000000  ? '#FC4E2A' :
         d > 500000   ? '#FD8D3C' :
         d > 250000   ? '#FEB24C' :
         d > 125000   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.data),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.2,
  };
}

export default function renderMap(state){
  console.log(state);
  L.geoJson(state, {style: style}).addTo(map);
}