'use strict';

export const locService = {
    getLoc: getLoc,
    getPosition: getPosition
}
var loc = { lat: 11.22, lng: 22.11 }

function getLoc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(loc);
        }, 0)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        .then(pos => {
            loc.lat=pos.latitude;
            loc.lom=pos.longitude
            // console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
    })
}

