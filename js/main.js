'use strict';

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather-service.js'
import{utilService} from './services/util-service.js'


locService.getLoc()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            locService.getPosition()
                .then(loc => {
                    console.log('User position is:', loc.coords);
                    let lat=loc.coords.latitude
                    let lng=loc.coords.longitude
                    locService.setLoc({ lat, lng})
                    // let name=

                    mapService.panTo(lat, lng);
                    locService.setLoc({ lat, lng});
                    mapService.addMarker({ lat, lng }, 'Your Location');
                    renderWeather();


                })
                .catch(err => {
                    console.log('err!!!', err);
                })
        })
        .catch(err => console.log('Map Error:', err));
console.log(utilService.linkBuilder())

}


document.querySelector(".search-now-btn").addEventListener("click", onSearchAddress);
document.querySelector(".my-location-btn").addEventListener("click", onGetPosition);

function onSearchAddress() {
    mapService.findLocationByString()
        .then(res => {
            let lat = res.results[0].geometry.location.lat
            let lng = res.results[0].geometry.location.lng
            let name = res.results[0].geometry.location.formatted_address
            locService.setLoc({ lat, lng, name })
            mapService.panTo(lat, lng)
            mapService.addMarker({ lat, lng }, name)
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