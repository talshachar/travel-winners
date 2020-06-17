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
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
}

