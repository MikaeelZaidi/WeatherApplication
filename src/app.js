const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port= process.env.PORT || 3000

//Defining the path for express config
const publicdirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(__dirname)

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicdirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Mikaeel Zaidi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mikaeel Zaidi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must Provide an Address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}= {} ) => {
        if (error) {
            return res.send({error})
            
        }
        forecast(latitude, longitude, (error, data) => {

            if (error) {
                return console.log(error)
            }

            res.send({
                location: location,
                weather: data
            })
        })
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title: 'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('App is running'+port)
})