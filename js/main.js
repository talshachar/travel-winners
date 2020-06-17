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
        .catch(err => console.log('Map Error:', err));

    locService.getPosition()
        .then(loc => {
            console.log('User position is:', loc.coords);
            mapService.panTo(loc.coords.latitude, loc.coords.longitude);
            renderWeather()
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

// loocService.getPosition()
//         .then(loc => {
//             mapService.initMap(loc.coords.latitude, loc.coords.longitude)
//                 .then(() => {
//                     mapService.addMarker({ lat: loc.coords.latitude, lng: loc.coords.longitude }, 'My Location');
//                 })
//                 .catch(console.log('INIT MAP ERROR'));
//             renderWeather()
//         })
//         .catch(err => {
//             console.log('Error:', err);
//         })

// document.querySelector('.btn').addEventListener('click', (ev) => {
//     console.log('Aha!', ev.target);
//     mapService.panTo(35.6895, 139.6917);
// })

// MAP SPECIFIC FUNCTIONS
// function onGeoLocation(){
//     infoWindow.close();
//     infoWindow = new google.maps.infoWindow;
//     if (navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(function(position){
//             var pos={
//                 lat:position.coords.latitude,
//                 lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Your Location');
//             infoWindow.open(map);
//             map.setCenter(pos);
//             document.querySelector('.my-location');
//             map.addListener('center_changed',event=>onCenterChanged());
//         },function(){
//             handleLocationError(true,infoWindow,map.getCenter());
//         });
//     }else{
//         handleLocationError(false,infoWindow,map.getCenter());
//     }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//     document.querySelector('.goto-geolocation div').style.backgroundPositionX = '-70px';
//     infoWindow.open(map);
// }

// function addMarker(loc ,city){
//     infoWindow.close();
//     let lat = loc.lat
//     let lng = loc.lng
//     var position = new google.maps.LatLng(lat, lng);

//     if (marker) marker.setMap(null);
//     marker = new google.maps.Marker({ title, position, center: position });

//     marker.setMap(map);

// }

// function ongCenterChanged() {
//     document.querySelector('.my-location').style.backgroundPositionX = '0px';
// }

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