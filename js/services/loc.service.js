'use strict';

export const locService = {
    getLoc,
    getPosition,
    setLoc
}
var gLoc = { lat: 11.22, lng: 22.11 , name : 'NY'}

function getLoc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLoc);
        }, 0)
    });
}

function setLoc(loc){
    gLoc=loc;
}


function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
}



