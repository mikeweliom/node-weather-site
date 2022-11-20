const request = require('postman-request')

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb854896cb6fbdf8f02545399317561e&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Service unavailable', undefined);
        } else if (body.error) {
            callback(error.info, undefined);
        } else {
            callback(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                current_temp: body.current.temperature,
                feels_like: body.current.feelslike
            });
        }
    })
}

module.exports = forecast;