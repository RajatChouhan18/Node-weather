const request = require('request')

const geocode = (address, callback) => {
    const mapbox_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=poi&access_token=pk.eyJ1IjoicmFqYXQxOCIsImEiOiJja2NvcjhtbTMwbnVqMnhzNmdnN2VoZW41In0.qOvHmvr7HAMC_tO8tf8sHQ`

    request({ url: mapbox_url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Connect to Location Services', undefined)
        } else if (!response.body.features.length) {
            callback(' Unable to find Location, Try another search', undefined)
        }else{
            callback(undefined,{
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
            })
        }
    })
}

// geocode('philadelphia', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = geocode