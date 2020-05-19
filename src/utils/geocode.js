const request = require( 'postman-request' )

const geocode = ( address, callback ) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnJlZGNvcnIiLCJhIjoiY2s5azltbm82MDAwbzNkcWs0bG05YnFsMiJ9.4dL-s7_3UMSe1zXjKbN8EQ&limit=1';
  request( { url, json: true }, ( error, {  body } ) => {

    const { features } = body;

      if ( error ) {
        callback( 'Unable to connect to location services', undefined )
      } else if ( features.length === 0 ) {
        callback( 'Unable to find address, Try another search', undefined )
      } else {
        callback( undefined, {
          lat: features[0].center[1],
          long: features[0].center[0],
          location: features[0].place_name
        })
      }
  })
}

module.exports = geocode;
