'use strict';

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather-service.js'


locService.getLoc()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            // map.addListener('click', event => addMarker(event));
        })
        .catch(err => console.log('Map Error:', err));

    locService.getPosition()
        .then(loc => {
            console.log('User position is:', loc.coords);
            mapService.panTo(loc.coords.latitude, loc.coords.longitude);
            mapService.addMarker({ lat: loc.coords.latitude, lng: loc.coords.longitude }, 'Your Location');
            renderWeather()
        })
        .catch(err => {
            console.log('err!', err);
        })
}


document.querySelector(".search-now-btn").addEventListener("click", onSearchAddress);
document.querySelector(".my-location-btn").addEventListener("click", onGetPosition);

function onSearchAddress() {
    mapService.findLocationByString()
        .then(res => {
            let lat = res.results[0].geometry.location.lat
            let lng = res.results[0].geometry.location.lng
            locService.setLoc({ lat, lng })
            mapService.panTo(lat, lng)
            mapService.addMarker({ lat, lng }, res.results[0].geometry.location.formatted_address)
            console.log(res)
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
            mapService.addMarker({ lat, lng }, 'Your Location')
            renderWeather()
        });
}

// loocService.getPosition()
//         .then(loc => {
//             mapService.initMap(loc.coords.latitude, loc.coords.longitude)
//                 .then(() => {
//                 })
//                 .catch(console.log('INIT MAP ERROR'));
//             renderWeather()
//         })
//         .catch(err => {
//             console.log('Error:', err);
//         })

// WEATHER
function renderWeather() {
    locService.getLoc()
        .then(loc => {
            const lat = loc.lat
            const lng = loc.lng
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