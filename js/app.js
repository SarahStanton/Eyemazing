"use strict";

var mapboxAccessToken = '';
var map = L.map('map').setView([21, 78], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
}).addTo(map);
