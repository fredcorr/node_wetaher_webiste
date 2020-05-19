const path = require('path')
const express = require('express');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');
const hbs = require('hbs');

// __dirname in a node script returns the path of the folder where the current JavaScript file resides
console.log( __dirname );

// The path.join() method joins all given path segments together, it helps in order to create an absolute paths to serve static content
const publicDir = path.join( __dirname, '../public' ) ;
// As above creates an absolute path with path.join(), to customise express to look for HBS views templates
const viewsPath = path.join( __dirname, '../templates/views' )
// As above creates an absolute path with path.join(), to customise express to look for HBS partial templates
const partialPath = path.join( __dirname, '../templates/partials' )

// initialise express
const app = express();

// sets express to use hbs as a view engine
app.set( 'view engine', 'hbs' )
// sets express to use a different folder from the default one
app.set( 'views', viewsPath )
// sets registered location for partials HBS
hbs.registerPartials(partialPath)
// sets express to serve static files from public folder
app.use( express.static( publicDir ) )


app.get( '', (req, res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Freddie'
  })
})

app.get( '/about', (req, res) => {
  res.render('about',{
    title: 'About page',
    name: 'Freddie'
  })
})

app.get( '/help', (req, res) => {
  res.render('help',{
    title: 'Help',
    message: 'Help page',
    name: 'Freddie'
  })
})

// sets a get method on the weather route
app.get( '/weather', (req, res) => {


    if ( !req.query.address ) {
      return res.send({
        error: "Must provide search terms"
      })
    }

    geocode( req.query.address, ( error, { long, lat, location } = {} ) => {

      if ( error ) {
        return res.send({
          error: error
        })
      }

      forecast( lat, long, ( error, forecastData ) => {
        if ( error ) {
          return res.send({
            error: error
          })
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        })

      })

    })


})

app.get( '/help/*', (req, res) => {
  res.render('404page',{
    errMessage: 'Help Article not found',
    title: '404',
    name: 'Freddie'
  })
})

app.get( '*', (req, res) => {
  res.render('404page',{
    errMessage: 'My 404 Page',
    title: '404',
    name: 'Freddie'
  })
})

app.listen( 3000, () => {
  console.log( 'Server is up on port 3000' );
});
