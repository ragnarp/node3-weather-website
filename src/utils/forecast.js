const request = require('request')

const forecast = ({ latitude, longitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e542d13eead2e47e60206be9396a5d51&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, response) => {
        if (!isSuccess(error, response)) {
            callback('Error getting forecast for latitude: ' + latitude + ',longitute: ' + longitute, undefined);
            //} else if (!isWeatherFound(response)) {
        } else if (!isWeatherFoundII(response)) {
            callback('Unable to get forecast! ', undefined);
        } else {
            const forecasst = response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + " but feels like " + response.body.current.feelslike + 
            " .The wind speed is " + response.body.current.wind_speed
            callback(undefined, { data: forecasst });
        }
    })
}

function isWeatherFoundII({ body }) {
    isFound = false
    //if (weather_descriptions && weather_descriptions[0]) {
    if (body && body.current && body.current.weather_descriptions && body.current.weather_descriptions[0]) {
        isFound = true
    } else {
        console.log('Weather not found!')
    }

    return isFound
}


function isWeatherFound(response) {
    isFound = false
    if (response.body && response.body.current && response.body.current.weather_descriptions && response.body.current.weather_descriptions[0]) {
        isFound = true
    } else {
        console.log('Weather not found!')
    }

    return isFound
}
function isSuccess(error, response) {
    success = true
    if (error) {
        console.log('Error Connecting to service')
        console.log(error)
        success = false
    } else if (response.error) {
        console.log('Service returnd error')
        console.log('Error: ' + response.error)
        success = false
    }
    return success
}

module.exports = forecast