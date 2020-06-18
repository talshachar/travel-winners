'use strict';

import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { weatherService } from './services/weather-service.js';
import { utilService } from './services/util-service.js';


// locService.getLoc()
// .then(locs => console.log('locs', locs));

window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            locService.getPosition()
                .then(loc => {
                    let lat = loc.coords.latitude;
                    let lng = loc.coords.longitude;
                    locService.setLoc({ lat, lng });
                    mapService.panTo(lat, lng);
                    locService.setLoc({ lat, lng });
                    document.querySelector('.my-location-btn').style.backgroundPositionX = '-47.5px';
                    mapService.findLocationByCoords()
                        .then(locStr => {
                            document.querySelector('.location-name').innerText = locStr.results[0].formatted_address;
                            mapService.addMarker({ lat, lng }, locStr.results[0].formatted_address);
                        });
                    renderWeather();
                    loadMapFromUrl();
                })
                .catch(err => {
                    document.querySelector('.my-location-btn').style.backgroundPositionX = '-100px';
                    console.log('Position Error:', err);
                })
        })
        .catch(err => console.log('Map Error:', err));

    document.querySelector(".share-location").addEventListener("click", toggleShareModal);
    document.querySelector(".global-modal").addEventListener("click", toggleShareModal);
    document.querySelector(".copy-btn").addEventListener("click", onCopy);
    document.querySelector(".wa-share-btn").addEventListener("click", onWhatsAppShare);
    document.querySelector(".search-now-btn").addEventListener("click", onSearchAddress);
    document.querySelector(".my-location-btn").addEventListener("click", onGetPosition);
    document.querySelector(".search-text").addEventListener("keyup", onSearchKeyUp);
}

function toggleShareModal() {
    const elModal = document.querySelector('.global-modal');
    elModal.hidden = !elModal.hidden;
}

function onCopy() {
    const elCopy = document.createElement('textarea');
    utilService.linkBuilder()
        .then(url => {
            elCopy.value = url;
            document.body.appendChild(elCopy);
            elCopy.select();
            document.execCommand('copy');
            document.body.removeChild(elCopy);
            document.querySelector('.global-modal').hidden = true;
        });
}

function onWhatsAppShare() {
    utilService.linkBuilder()
        .then(url => {
            window.open('https://api.whatsapp.com/send?&text=%20' + encodeURIComponent(url));
            document.querySelector('.global-modal').hidden = true;
        });
}


function onSearchAddress() {
    mapService.findLocationByString()
        .then(res => {
            const lat = res.results[0].geometry.location.lat;
            const lng = res.results[0].geometry.location.lng;

            locService.setLoc({ lat, lng, name })
            mapService.panTo(lat, lng)
            mapService.findLocationByCoords()
                .then(locStr => {
                    document.querySelector('.location-name').innerText = locStr.results[0].formatted_address;
                    mapService.addMarker({ lat, lng }, locStr.results[0].formatted_address);
                });
            renderWeather()
        })
}

function onGetPosition() {
    locService.getPosition()
        .then(loc => {
            const lat = loc.coords.latitude;
            const lng = loc.coords.longitude
            locService.setLoc({ lat, lng })
            mapService.panTo(lat, lng)
            mapService.findLocationByCoords()
                .then(locStr => {
                    document.querySelector('.location-name').innerText = locStr.results[0].formatted_address;
                    mapService.addMarker({ lat, lng }, locStr.results[0].formatted_address);
                });
            document.querySelector('.my-location-btn').style.backgroundPositionX = '-47.5px';
            renderWeather()
        });
}

function loadMapFromUrl() {
    let lat = +getQueryVariable('lat')
    let lng = +getQueryVariable('lng')

    if (!lat || !lng) return;

    locService.setLoc({ lat, lng })
    mapService.panTo(lat, lng)
    mapService.findLocationByCoords()
        .then(locStr => {
            document.querySelector('.location-name').innerText = locStr.results[0].formatted_address;
            mapService.addMarker({ lat, lng }, locStr.results[0].formatted_address);
        });

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

// WEATHER
function renderWeather() {
    locService.getLoc()
        .then(loc => {
            const lat = loc.lat
            const lng = loc.lng
            weatherService.getWeather(lat, lng)
                .then(weather => {
                    document.querySelector('.weather-location').innerText = 'in ' + weather.name;
                    document.querySelector('.temp').innerHTML = 'Temp: ' + weather.main.temp + '&deg;C';
                    document.querySelector('.wind-speed').innerText = 'Wind: ' + weather.wind.speed + ' m/s';
                    document.querySelector('.general-weather-desc').innerText = weather.weather[0].description;
                })
        })
}

function onSearchKeyUp() {
    if (event.key === 'Enter') onSearchAddress();
}