const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c203123f140ca3b8937fb1f557e28dfb&query=' + lat + ',' + long + '&units=f'
    //option object
    // request({ url: url, json: true}, (error, response) => {//only error or response is populated
    request({ url, json: true}, (error, {body}) => {//only error or response is populated
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                temp: body.current.temperature,
                temp_feelslike: body.current.feelslike,
                desc: body.current.weather_descriptions[0],
                humidity: body.current.humidity
            })
        }
    })//getting only json part
}

module.exports = forecast