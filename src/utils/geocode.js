const request = require('postman-request');

const geocode = (address, callback) => {
    setTimeout(() => {
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json";
        request({ url, json: true }, (error, response) => {
            if (error) {
                callback('Service unavailable', undefined)
            }
            // else if (response.body.message) {
            //     callback('Unable to find location. Try another location', undefined)
            //     console.log(response.body.message)
            // }
            else {
                console.log('API gives response ' + JSON.stringify(response.body));
                // const latitude = response.body.features[0].center[0];
                // const longitude = response.body.features[0].center[1];
                //console.log(latitude, longitude)
                const latitude = 12.9716;
                const longitude = 77.5946;
                const place = address
                callback(undefined, {
                    latitude,
                    longitude,
                    place
                });
            }
        });
    }, 2000)
}

module.exports = geocode;