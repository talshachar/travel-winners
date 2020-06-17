'use strict';

var gCurrLoc = {
    lat: 32.0749831,
    lng: 34.9120554
}

console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather-service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: gCurrLoc.lat, lng: gCurrLoc.lng });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
    weatherService.getWeather(gCurrLoc.lat, gCurrLoc.lng)
        .then(weather => {
            console.log(weather)
            renderWeather(weather)
        })

}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);
})


function renderWeather(weather) {
    document.querySelector('.temp').innerHTML = 'Temp: '+weather.main.temp+'&#8451;';
    document.querySelector('.wind-speed').innerText = 'Wind: '+ weather.wind.speed;
    document.querySelector('.general-weather-desc').innerText = weather.weather[0].description ;
}