const path = require('path')
const express = require('express')//one single function to create express call to a single function
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static dir to serve
app.use(express.static(publicDirPath))//way to customize the server

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Ivan Johnson'
    })
})

app.get('/about',(req, res) =>{
    //res.render('about')//enough to load
    res.render('about', {
        title: 'About Me',
        name: 'Ivan Johnson'
    })
})

app.get('/help',(req, res) =>{
    res.render('help', {
        title: 'Available Help',
        msg: 'Click the link below to email for help',
        name: 'Ivan Johnson'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    }) //send back
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }else{
                                 //Destructuring; setting default value of the object to an empty object if the object is not returned  
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error){
                return res.send({ error })
            }
            //call forecast
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({ error })
                }
                res.send({
                    forecast: ('Temperature: ' + forecastData.temp + ', Feels like: ' + forecastData.temp_feelslike  + ", Humidity: " + forecastData.humidity + '%, ' + forecastData.desc),
                    address: req.query.address,
                    location
                }) //send back
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Ivan Johnson',
        errorMsg: 'Help Article not found'
    })
})

//* match everything
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Ivan Johnson',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})



// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Ivan',
//         age: 21
//     },{
//         name: 'Suzy'
//     }]) //send back to request
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Us<h1>') //send back
// })