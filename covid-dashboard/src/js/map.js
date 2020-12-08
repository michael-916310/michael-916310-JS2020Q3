import * as L from 'leaflet';
import mapWorldCounty from './mapCountries';

const mapboxAccessToken = 'pk.eyJ1IjoibWljaGFlbDkxNjMxMCIsImEiOiJja2lmeHFuNWswaXQxMnNxazFpcWxpN3ZzIn0.QodWnu0mJ06VgvFkow7d_Q';
const map = L.map('mapid').setView([37.8, 96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

let i = 0;
mapWorldCounty.features.forEach((item) => {
  item.properties.density=i++;
});

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
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
  L.geoJson(state, {style: style}).addTo(map);
}