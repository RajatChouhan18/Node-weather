const request = require("request")
//const geocode = require('./geocode')

//openweathermap.org api key - 9f228f30815c9a054df068dfea2a1ac4


const forecast = (lat, lon, callback) => {
    const forecast_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=9f228f30815c9a054df068dfea2a1ac4`

    request({ url: forecast_url, json: true }, (error, Response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (Response.body.error === null) {
            callback('Unable to detect location ', undefined)
        } else {
            let temp = Response.body.current.temp
            let wind = Response.body.current.wind_speed
            let weather = Response.body.current.weather[0].description
            callback(undefined, 'the weather is '+ weather +' the temprature today is ' + temp + ' Celcius and the wind speed is ' + wind+ ' Kmph')
        }
    })
}

module.exports = forecast