const request = require('request')

const geocode = (address, callback) => {
    const addressUri = encodeURIComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + addressUri + '.json?access_token=pk.eyJ1IjoicmFnbmFycCIsImEiOiJja214Z3VlczcwbXdiMm9wOWRveWczb25nIn0.JJOS8I6dE3N2tXiVrd9Blg&limit=1'
    request({ url, json: true }, (error, response) => {
        if (!isSuccess(error, response)) {
            callback('Error searching for address: ' + address + '', undefined);
        } else if (!isGeoFound(response)) {
            callback('Unable to find address: ' + address + '', undefined);
        } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const place_name = response.body.features[0].place_name

            callback(undefined, {latitude, longitude, location: place_name });
        }
    })
}


function isGeoFound({ body }) {
    isFound = false
    if (body.features && body.features[0]) {
        isFound = true
    } else {
        console.log('No cordinates found!')
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


module.exports = geocode

