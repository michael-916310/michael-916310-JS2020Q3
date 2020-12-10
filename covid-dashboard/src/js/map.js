import * as L from 'leaflet';

const mapboxAccessToken = 'pk.eyJ1IjoibWljaGFlbDkxNjMxMCIsImEiOiJja2lmeHFuNWswaXQxMnNxazFpcWxpN3ZzIn0.QodWnu0mJ06VgvFkow7d_Q';
const map = L.map('mapid').setView([37.8, 96], 4);

let absoluteDescription;
let accumulateDescription;
let paramDescription;

let geojson;
const info = L.control();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
}

info.update = function (props) {
  this._div.innerHTML = `
  <h4>${absoluteDescription}</h4>
  <h4>${accumulateDescription}</h4>
  <h4>${paramDescription}</h4>
  ` +  (props ?
      '<b>' + props.name + '</b><br />' + props.data + ' '
      : 'Наведите кусор на страну');
};

info.addTo(map);

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

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

export default function renderMap(state){

  absoluteDescription = state.absoluteDescription;
  accumulateDescription = state.accumulateDescription;
  paramDescription = state.param;

  geojson = L.geoJson(state, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  info.update();
}