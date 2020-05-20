const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastText = document.querySelector('#forecast');
const locationText = document.querySelector('#location')

weatherForm.addEventListener( 'submit', (e) => {
  e.preventDefault();
  const location = search.value;
  locationText.textContent = 'Loading...';
  forecastText.textContent = '';

  fetch( '/weather?address=' + location ).then( ( response ) => {

    response.json().then( (data) => {

      if ( data.error ) {
          return locationText.textContent = data.error;
      }

      locationText.textContent = data.location;
      forecastText.textContent = data.forecast;

    })

  })

})
