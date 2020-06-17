
export const mapService = {
    initMap,
    addMarker,
    panTo,
    findLocationByString
}
const API_KEY = 'AIzaSyCUpkuBnIe4RI30DIj1E2435wHFkUVSF1k'; // √ (Tal's Key) TODO: Enter your API Key


var map;


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function addMarker(loc, title = 'Hello World!') {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title
    });
    console.log(marker)
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    console.log(laLatLng)
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



function findLocationByString() {
    let searchString = document.querySelector('.search-text').value;
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${API_KEY}`)
        .then(res => {
            // console.log(res);
            return res.data;
        })
}