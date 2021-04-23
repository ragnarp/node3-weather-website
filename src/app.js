const path = require('path')
const hbs = require('hbs')
const express = require('express')
const { read } = require('fs')
const geocode = require('./utils/ceocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)
const puplicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars for express engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup html static folder
app.use(express.static(puplicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Program',
        name: 'My Weather',
        createdBy: 'Mead!'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        createdBy: 'Mead!'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        help: 'Use this page to find your weather!!!',
        createdBy: 'Mead!'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (address) {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (latitude && longitude) {
                console.log(location)
                forecast({ latitude, longitude }, (error, forecastData) => {
                    if (error) {
                        return res.send({ error: error })
                    } else {

                        return res.send(
                            {
                                location,
                                address,
                                forecast: forecastData.data
                            })
                    }
                })
            } else {
                return res.send({ error: error })
            }

        })
    } else {
        return res.send({ error: 'Please provide addres!' })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', { title: '404', page_404_message: 'Help article not found', createdBy: 'Mead!' })
})

app.get('*', (req, res) => {
    res.render('404', { title: '404', page_404_message: 'Page not found', createdBy: 'Mead!' })
})
//app.com
//app.com/help
//app.com/about
app.listen(port, () => {
    console.log('Running on ' + port)
})
