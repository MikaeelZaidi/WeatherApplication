const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d62e332278aa5faa342bc3952eb954f8/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Error:Unable to connect to network', undefined)
        }
        else if (response.body.error) {
            callback('Error:Unable to connect to the API', undefined)
        }

        else {
            callback(undefined, response.body.hourly.summary+'Currently it is '+response.body.currently.temperature+' F')
        }

    })
}

module.exports = forecast