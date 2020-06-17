'use strict'

export const weatherService = {
    getWeather
}

var W_KEY = '54b1e010ed0f97537666a296504f7ba4';


function getWeather(lat, lng) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${W_KEY}`)
        .then(res => res.data)
}


