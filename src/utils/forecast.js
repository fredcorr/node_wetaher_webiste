const request = require( 'postman-request' )

const forecast = ( lat, long, callback ) => {
  const url = 'http://api.weatherstack.com/current?access_key=ea1ed3b0a6fbfcab89e374d0084bc954&query='+ lat + ',' + long
  request( { url, json: true }, ( error, { body } ) => {

      if ( error ) {

        callback( 'Unable to connect to weather service', undefined );

      } else if ( body.error ) {

        callback( 'Unable to find location', undefined );

      } else {

        const forecast = ". It's currently " + body.current.temperature + " degrees out . It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%, while the UV index is " + body.current.uv_index;
        callback( undefined, body.current.weather_descriptions[0] + forecast )
      }

  })
}

module.exports = forecast;
