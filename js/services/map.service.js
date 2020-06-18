
export const mapService = {
    initMap,
    addMarker,
    panTo,
    findLocationByString,
    findLocationByCoords
}
const API_KEY = 'AIzaSyCUpkuBnIe4RI30DIj1E2435wHFkUVSF1k'; // √ (Tal's Key) TODO: Enter your API Key


var map, marker;


function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function addMarker(loc, title = 'Pinned Location') {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        title,
        icon: 'img/icons/paper-plane-marker.png'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

import { locService } from './loc.service.js';

function findLocationByCoords() {
    const loc = locService.getLoc()
        .then(loc => {
            const searchString = loc.lat + ',' + loc.lng;
            return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${API_KEY}`)
                .then(res => {
                    return res.data;
                })
        })
    return loc;
}

function findLocationByString() {
    const searchString = document.querySelector('.search-text').value;
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${API_KEY}`)
        .then(res => {
            return res.data;
        })
}
