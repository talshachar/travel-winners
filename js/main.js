'use strict';



console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather-service.js'


locService.getLoc()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
        renderWeather()


}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);
})


function renderWeather() {
    locService.getLoc()
    .then(loc => {
        let lat=loc.lat
        let lng=loc.lng
        weatherService.getWeather(lat, lng)
        .then(weather => {
            console.log(weather)
            document.querySelector('.weather-location').innerText = 'in ' + weather.name;
            document.querySelector('.temp').innerHTML = 'Temp: ' + weather.main.temp + '&#8451;';
            document.querySelector('.wind-speed').innerText = 'Wind: ' + weather.wind.speed + ' m/s';
            document.querySelector('.general-weather-desc').innerText = weather.weather[0].description;
        })
    })
    
    

}