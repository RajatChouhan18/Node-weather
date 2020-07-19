const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000

// Define paths for Express config
const PUBLIC_DIR_PATH = path.join(__dirname, '../public')
const VIEWS_PATH = path.join(__dirname, '../templates/views')
const PARTIALS_PATH = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', VIEWS_PATH)
hbs.registerPartials(PARTIALS_PATH)


// Setup static directory to serve
app.use(express.static(PUBLIC_DIR_PATH))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rajat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rajat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Help Here',
        title: 'HELP',
        name: 'Rajat'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'The Location is not provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.seatch) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rajat Head',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rajat Head',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is Running '+ port);
})


// res.send() - send json
// res.render() - render a template/view